from flask import Flask, request, jsonify, Blueprint
from backend.models import db, User, Reviews
from flask_cors import CORS
import requests

TMDB_API_KEY = 'ef1972bcabdcfd5e6e3b2b9c7b92661d'

api = Blueprint('api', __name__, url_prefix="/api")

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json(
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    password = data.get('password')

    if not first_name or last_name or not email or not Password:
        return jsonify({ 'error': 'Missing required fields'}),400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered successfully'}), 201

    new_user = User(
        first_name=first_name,
        last_name=last_name,
        email=email
    )
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201
   
@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
    # If you have token-based authentication, generate and return a token here.
        return jsonify({'message': 'Login successful', 'user': user.serialize()}), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401

@api.route('/top-rated/movies', methods=['GET'])
def get_top_rated_movies():
    try:
        response = requests.get(f'https://api.themoviedb.org/3/movie/top_rated?api_key={TMDB_API_KEY}')
        response.raise_for_status()
        return jsonify(response.json().get('results', []))
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

@api.route('/top-rated/shows', methods=['GET'])
def get_top_rated_shows():
    try:
        response = requests.get(f'https://api.themoviedb.org/3/tv/top_rated?api_key={TMDB_API_KEY}')
        response.raise_for_status()
        return jsonify(response.json().get('results', []))
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

@api.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')
    try:
        response = requests.get(f'https://api.themoviedb.org/3/search/multi?api_key={TMDB_API_KEY}&query={query}')
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

@api.route("/review", methods=["POST"])
def add_review():
    print('method called')
    body = request.json
    print(body)

    try:
        review = Reviews(
            review=body["reviewData"],
            movie_id=body["movieId"],
            user_id=body["userId"]
        )
        db.session.add(review)
        db.session.commit()
        db.session.refresh(review)
        return jsonify(review.serialize()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500



