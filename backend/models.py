from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from flask_bcrypt import Bcrypt
from sqlalchemy.ext.hybrid import hybrid_property

from config import db

class User(db.Model, SerializerMixin):
    __tablename__= 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    _password_hash = db.Column(db.String(100), unique = True, nullable=False)
    email = db.Column(db.String(100), nullable=False)
    

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

    # animals = db.relationship('Animal', back_populates='user')

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'phone': self.phone,
            'address': self.address
            
        }

    # Update serialization rules
    # serialize_rules = ['-animal.user']
    

    def __repr__(self):
        return f'<User {self.id}: {self.username}>'

class Owner(db.Model, SerializerMixin):
    __tablename__ = "owners"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    company_type = db.Column(db.String)

    brands = db.relationship('Brand' , back_populates = 'owner')

    serialize_rules = ['-brand.owner']

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


