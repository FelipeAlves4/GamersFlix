# app/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///computers.db'
db = SQLAlchemy(app)

from app import routes

# app/models.py
from app import db

class Part(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    usage = db.Column(db.String(100), nullable=False)  # Ex: gaming, editing, etc.

# app/recommendations.py
from app.models import Part

def recommend_parts(budget, usage):
    parts = Part.query.filter_by(usage=usage).all()
    recommended = [part for part in parts if part.price <= budget]
    return recommended

# app/routes.py
from flask import request, jsonify
from app import app, db
from app.recommendations import recommend_parts

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    budget = data.get('budget')
    usage = data.get('usage')
    recommendations = recommend_parts(budget, usage)
    return jsonify([{'name': part.name, 'price': part.price} for part in recommendations])

# config.py
DEBUG = True


# Criação do banco de dados (executado uma vez)
from app import db
db.create_all()

# Inserir dados de exemplo (executado uma vez)
from app.models import Part

parts = [
    Part(name='Intel i7', type='CPU', price=300.00, usage='gaming'),
    Part(name='AMD Ryzen 5', type='CPU', price=200.00, usage='gaming'),
    Part(name='NVIDIA GTX 1660', type='GPU', price=250.00, usage='gaming'),
    Part(name='Corsair 16GB RAM', type='RAM', price=80.00, usage='gaming'),
    Part(name='Samsung 970 EVO', type='SSD', price=150.00, usage='editing')
]

db.session.add_all(parts)
db.session.commit()
