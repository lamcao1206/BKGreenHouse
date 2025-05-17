import jwt
from flask import request, jsonify
import os

def token_guard(f):
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({'message': 'Token is missing!'}), 401

        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != 'bearer':
            return jsonify({'message': 'Invalid token format!'}), 401

        token = parts[1]

        try:
            jwt.decode(token, os.getenv('JWT_SECRET_KEY'), algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 401
    
        return f(*args, **kwargs)
    return wrapper