from flask import Flask, request, session, redirect, url_for, render_template, jsonify
from flask_bcrypt import Bcrypt
from sqlalchemy import desc


from config import app, db, migrate, api

from models import db, User, Brand, Category, Owner

@app.route('/')
def home():
    return ''

@app.route('/signup', methods=['POST'])
def signup():
    json_data = request.get_json()

    required_fields = ['username', 'password', 'email']
    for field in required_fields:
        if field not in json_data:
            return {'error': f'Missing required field: {field}'}, 400


    new_user = User(
        username=json_data['username'],
        password_hash=json_data['password'],  
        email=json_data['email'],
        
    )

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

    # Update session with user_id and user_type
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

@app.route('/brands', methods = ['GET', 'POST'])
def all_brands():
    if request.method == 'GET':
        all_brands = Brand.query.all()
        results = []
        for brand in all_brands:
            results.append(brand.to_dict())
        return results, 200
    
    elif request.method == 'POST': 
        json_data = request.get_json()
        new_brand = Brand(
            name = json_data.get('name'),
            category = json_data.get('category'),
            owner = json_data.get('owner'),
            category_id = json_data.get('category_id'),
            owner_id = json_data.get('owner_id'),
            notes = json_data.get('notes'),
        )
        db.session.add(new_brand)
        db.session.commit()

        return new_brand.to_dict(), 201

@app.route('/brands/<int:id>', methods = ['GET', 'PATCH', 'DELETE'])
def brands_by_id(id):
    brand = Brand.query.filter(Brand.id == id).first()

    if brand is None:
        return {'error', "Brand Not Found"}, 404
    if request.method == 'GET':
        return brand.to_dict(),200
    elif request.method == 'DELETE':
        db.session.delete(brand)
        db.session.commit()
        return{}, 204
    
   
