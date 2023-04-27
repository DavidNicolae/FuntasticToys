from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity, unset_jwt_cookies

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://admin:admin@funtastictoys-db:5432/funtastictoys'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'jwt-secret-key'

db = SQLAlchemy(app)
jwt = JWTManager(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(64), index=True, unique=True, nullable=False)
    mail = db.Column(db.String(120), index=True, unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    active_token = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False)
    address = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return '<User {}>'.format(self.full_name)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def generate_token(self):
        return create_access_token(identity=self.full_name)

@app.route('/test')
def test_route():
    return jsonify({"message": "Hello, World!"})

@app.route('/register', methods=['POST'])
def register():
    full_name = request.json['full_name']
    mail = request.json['mail']
    password = request.json['password']
    active_token = request.json['active_token']
    role = request.json['role']
    address = request.json['address']
    
    # check if the username is available
    if User.query.filter_by(full_name=full_name).first() is not None:
        return jsonify(message='Username is already taken'), 409

    # create a new user and add it to the database
    user = User(full_name=full_name, mail=mail, active_token=active_token, role=role, address=address)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify(message='User registered successfully!'), 201

@app.route('/login', methods=['POST'])
def login():
    full_name = request.json['full_name']
    password = request.json['password']

    # check if the user exists
    user = User.query.filter_by(full_name=full_name).first()
    if user is None or not user.check_password(password):
        return jsonify(message='Invalid username or password'), 401

    # generate a new JWT token for the user
    token = user.generate_token()

    # update the user's active_token field with the new token
    user.active_token = token
    db.session.commit()

    return jsonify(token=token), 200

@app.route('/protected')
@jwt_required
def protected():
    username = get_jwt_identity()
    return jsonify(message=f'You are authorized to access this resource as {username}'), 200

@app.route('/logout')
@jwt_required()
def logout():
    # not tested yet
    current_user = User.query.filter_by(full_name=get_jwt_identity()).first()
    current_user.active_token = ''
    db.session.commit()
    unset_jwt_cookies()
    return jsonify(message='User logged out successfully!'), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)