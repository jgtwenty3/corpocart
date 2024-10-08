from flask import Flask, request, session, jsonify
from flask_bcrypt import Bcrypt
from config import app, db, migrate
from models import User, Brand, Category, Owner, ShoppingList

bcrypt = Bcrypt()

@app.route('/')
def home():
    print("Home route accessed")  # Debug output
    return 'Welcome to the Shopping List API!'

@app.route('/signup', methods=['POST'])
def signup():
    json_data = request.get_json()

    required_fields = ['username', 'password', 'email']
    for field in required_fields:
        if field not in json_data:
            return {'error': f'Missing required field: {field}'}, 400

    new_user = User(
        username=json_data['username'],
        email=json_data['email'],
    )
    new_user.password_hash = json_data['password']  # Use the setter for hashing

    db.session.add(new_user)
    db.session.commit()

    return {'message': 'User registered successfully'}, 201

@app.route('/login', methods=['POST'])
def login():
    json_data = request.get_json()

    required_fields = ['username', 'password']
    for field in required_fields:
        if field not in json_data:
            return {'error': f'Missing required field: {field}'}, 400

    user = User.query.filter(User.username == json_data.get('username')).first()

    if not user:
        return {'error': 'User not found'}, 404

    if not user.authenticate(json_data.get('password')):
        return {'error': 'Invalid password'}, 401

    session['user_id'] = user.id
    return user.to_dict(), 200

@app.route('/check_session', methods=['GET'])
def check_session():
    user_id = session.get('user_id')

    if user_id is not None:
        user = User.query.get(user_id)
        if user:
            return user.to_dict(), 200
    return {}, 401

@app.route('/logout', methods=['DELETE'])
def logout():
    session.pop('user_id', None)
    return {}, 204

@app.route('/brands', methods=['GET', 'POST'])
def all_brands():
    if request.method == 'GET':
        all_brands = Brand.query.all()
        results = [brand.to_dict() for brand in all_brands]
        return results, 200
    
    elif request.method == 'POST':
        json_data = request.get_json()
        new_brand = Brand(
            name=json_data.get('name'),
            category_id=json_data.get('category_id'),  # Ensure category_id is passed
            owner_id=json_data.get('owner_id'),        # Ensure owner_id is passed
            notes=json_data.get('notes'),
        )
        db.session.add(new_brand)
        db.session.commit()

        return new_brand.to_dict(), 201

@app.route('/brands/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def brands_by_id(id):
    brand = Brand.query.filter(Brand.id == id).first()

    if brand is None:
        return {'error': "Brand Not Found"}, 404

    if request.method == 'GET':
        return brand.to_dict(), 200
    
    elif request.method == 'DELETE':
        db.session.delete(brand)
        db.session.commit()
        return {}, 204

# Shopping List Routes
@app.route('/shopping_list', methods=['GET', 'POST'])
def shopping_list():
    if request.method == 'GET':
        user_id = session.get('user_id')
        if user_id is None:
            return {'error': 'Unauthorized'}, 401
        shopping_lists = ShoppingList.query.filter_by(user_id=user_id).all()
        return [shopping_list.to_dict() for shopping_list in shopping_lists], 200
    
    elif request.method == 'POST':
        json_data = request.get_json()
        user_id = session.get('user_id')
        if user_id is None:
            return {'error': 'Unauthorized'}, 401

        new_shopping_list = ShoppingList(
            user_id=user_id,
            name=json_data.get('name'),  # Added name field for the shopping list
        )
        db.session.add(new_shopping_list)
        db.session.commit()

        return new_shopping_list.to_dict(), 201

@app.route('/shopping_list/<int:id>', methods=['DELETE'])
def delete_shopping_list(id):
    shopping_list = ShoppingList.query.get(id)

    if shopping_list is None:
        return {'error': 'Shopping list not found'}, 404
    
    db.session.delete(shopping_list)
    db.session.commit()
    return {}, 204

@app.route('/owners', methods=['GET', 'POST'])
def all_owners():
    if request.method == 'GET':
        all_owners = Owner.query.all()
        results = [owner.to_dict() for owner in all_owners]
        return results, 200
    
    elif request.method == 'POST':
        json_data = request.get_json()
        new_owner = Owner(
            name=json_data.get('name'),
            company_type=json_data.get('company_type'),  # Make sure to use company_type
            notes=json_data.get('notes'),
        )
        db.session.add(new_owner)
        db.session.commit()
        return new_owner.to_dict(), 201

@app.route('/owners/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def owner_by_id(id):
    owner = Owner.query.filter(Owner.id == id).first()

    if owner is None:
        return {'error': "Owner not found"}, 404
    
    if request.method == 'GET':
        return owner.to_dict(), 200

    elif request.method == 'DELETE':
        db.session.delete(owner)
        db.session.commit()
        return {}, 204
    
@app.route('/categories', methods=['GET', 'POST'])
def all_categories():
    if request.method == 'GET':
        all_categories = Category.query.all()
        results = [category.to_dict() for category in all_categories]  # Fixed the variable name
        return results, 200 

    elif request.method == 'POST':
        json_data = request.get_json()
        new_category = Category(
            name=json_data.get('name'),
        )
        db.session.add(new_category)
        db.session.commit()

        return new_category.to_dict(), 201

@app.route('/categories/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def category_by_id(id):
    category = Category.query.filter(Category.id == id).first()

    if category is None:
        return {'error': "Category not Found"}, 404
    
    if request.method == 'GET':
        return category.to_dict(), 200
    
    elif request.method == 'DELETE':
        db.session.delete(category)
        db.session.commit()
        return {}, 204
