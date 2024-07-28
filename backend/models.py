from flask_sqlalchemy import SQLAlchemy
import werkzueg.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False, default=True)
    reviews = db.relationship("Reviews", backref="user", lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'
    
    def set_password(self, password):
        #Generate a salt and hash the password
       self.password = generate_password_hash(password)

    def check_password(self, password):
        #check if passwords match   
        return check-password-hash (self.password, password)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "reviews": [review.serialize() for review in self.reviews]
            # do not serialize the password, its a security breach
        }

class Reviews(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    review=db.Column(db.Text,nullable=False)
    movie_id=db.Column(db.Integer,nullable=False)
    user_id=db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "movie_id": self.movie_id,
            "user_id": self.user_id,
        }

