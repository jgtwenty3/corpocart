from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from flask_bcrypt import Bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
from config import db

bcrypt = Bcrypt()

class User(db.Model, SerializerMixin):
    __tablename__= 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    _password_hash = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), nullable=False)
    
    # Relationship to ShoppingList
    shopping_lists = db.relationship('ShoppingList', back_populates='user')

    @hybrid_property
    def password_hash(self):
        """getter"""
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, new_password):
        """setter"""
        pass_hash = bcrypt.generate_password_hash(new_password.encode('utf-8'))
        self._password_hash = pass_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8')) if self._password_hash else False

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'shopping_lists': [shopping_list.to_dict() for shopping_list in self.shopping_lists]
        }

    def __repr__(self):
        return f'<User {self.id}: {self.username}>'

class Owner(db.Model, SerializerMixin):
    __tablename__ = "owners"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    company_type = db.Column(db.String)
    notes = db.Column(db.String)

    brands = db.relationship('Brand', back_populates='owner')

    serialize_rules = ['-brands.owner']

    def __repr__(self):
        return f'<Owner {self.id} {self.name}>'

class Brand(db.Model, SerializerMixin):
    __tablename__ = "brands"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    owner_id = db.Column(db.Integer, db.ForeignKey('owners.id'))

    owner = db.relationship('Owner', back_populates='brands')
    category = db.relationship('Category', back_populates='brands')
    notes = db.Column(db.String)

    # Relationship to ShoppingList
    shopping_lists = db.relationship('ShoppingListBrand', back_populates='brand')

    serialize_rules = ['-owner']

    def __repr__(self):
        return f'<Brand {self.id} {self.name}>'

class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    brands = db.relationship('Brand', back_populates='category')

    serialize_rules = ['-brands.category']

    def __repr__(self):
        return f'<Category {self.id} {self.name}>'

class ShoppingList(db.Model, SerializerMixin):
    __tablename__ = "shopping_lists"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)  # Optional: name for the shopping list
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))  # Link to user

    user = db.relationship('User', back_populates='shopping_lists')

    # Many-to-Many relationship with brands
    brands = db.relationship('ShoppingListBrand', back_populates='shopping_list')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
            'brands': [brand.to_dict() for brand in self.brands]  # Include brand information
        }

    def __repr__(self):
        return f'<ShoppingList {self.id}: {self.name}>'

class ShoppingListBrand(db.Model):
    __tablename__ = 'shopping_list_brands'

    id = db.Column(db.Integer, primary_key=True)
    shopping_list_id = db.Column(db.Integer, db.ForeignKey('shopping_lists.id'))
    brand_id = db.Column(db.Integer, db.ForeignKey('brands.id'))

    shopping_list = db.relationship('ShoppingList', back_populates='brands')
    brand = db.relationship('Brand', back_populates='shopping_lists')

    def to_dict(self):
        return {
            'id': self.id,
            'shopping_list_id': self.shopping_list_id,
            'brand_id': self.brand_id,
            'brand_name': self.brand.name,  # Include brand name
            'owner_name': self.brand.owner.name if self.brand.owner else None  # Include owner name
        }
