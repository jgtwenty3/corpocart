

from app import app

from models import db, User, Brand,Category,Owner

from app import db
from models import User, Owner, Brand, Category
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

def seed():
    # Clear all existing data
    db.drop_all()
    db.create_all()

    # Create Users
    user1 = User(
        username='justin',
        email='justin@example.com',
    )
    user1.password_hash = 'password123'  # hashed password using the setter

    user2 = User(
        username='maria',
        email='maria@example.com',
    )
    user2.password_hash = 'securepassword'  # hashed password using the setter

    # Create Categories
    category1 = Category(name="Cereal")
    category2 = Category(name="Chips & Snacks")
    category3 = Category(name="Baby Food")

    # Create Owners
    owner1 = Owner(name="General Mills", company_type="Megacorp", notes="Fueling your morning—and their empire. Every spoonful supports corporate dominance, not local farms.")
    owner2 = Owner(name="Kellogg's", company_type="Megacorp", notes="nap, crackle, profit! Your breakfast funds a global giant focused more on shareholders than sustenance.")
    owner3 = Owner(name="Post", company_type="Megacorp", notes="Big Cereal, bigger profits. Post isn't just feeding you, they're feeding the shareholders.")
    owner4 = Owner(name="PepsiCo", company_type="Megacorp", notes="Quench your thirst—for corporate power. Every sip supports another monopoly move.")
    owner5 = Owner(name="Nature's Path", company_type="Founder Family Owned", notes="A rare rebel in the food aisle—staying ethical in a world of corporate giants. Support the little guy!")

    # Create Brands
    brand1 = Brand(name="Cheerios", category=category1, owner=owner1)
    brand2 = Brand(name="Froot Loops", category=category1, owner=owner2)
    brand3 = Brand(name="Honey Bunches of Oats", category=category1, owner=owner3)
    brand4 = Brand(name="Cap'n Crunch", category=category1, owner=owner4)
    brand5 = Brand(name="Gorilla Munch", category=category1, owner=owner5)

    # Add objects to session
    db.session.add(user1)
    db.session.add(user2)

    db.session.add(category1)
    db.session.add(category2)
    db.session.add(category3)

    db.session.add(owner1)
    db.session.add(owner2)
    db.session.add(owner3)
    db.session.add(owner4)
    db.session.add(owner5)

    db.session.add(brand1)
    db.session.add(brand2)
    db.session.add(brand3)
    db.session.add(brand4)
    db.session.add(brand5)

    # Commit to the database
    db.session.commit()
    print("Database seeded successfully!")


if __name__ == "__main__":
    seed()
