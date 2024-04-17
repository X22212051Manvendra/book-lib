import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app=app)

def create_db():
    conn = sqlite3.connect('books.db')
    c = conn.cursor()

    c.execute('''CREATE TABLE IF NOT EXISTS books
                (id INTEGER PRIMARY KEY, title TEXT, author TEXT, description TEXT, genre TEXT, published_date TEXT, rating REAL)''')

    conn.commit()
    conn.close()
    

# CRUD Operations
@app.route('/books', methods=['GET', 'POST'])
def books():
    conn = sqlite3.connect('books.db')
    c = conn.cursor()

    if request.method == 'GET':
        c.execute("SELECT * FROM books")
        books = c.fetchall()
        conn.close()
        keys = ['id', 'title', 'author', 'description', 'genre', 'published_date', 'rating']
        books_with_keys = [dict(zip(keys, book)) for book in books]
        return books_with_keys

    elif request.method == 'POST':
        data = request.get_json()
        title = data['title']
        author = data['author']
        description = data['description']
        genre = data['genre']
        published_date = data['published_date']
        rating = data['rating']

        c.execute("INSERT INTO books (title, author, description, genre, published_date, rating) VALUES (?, ?, ?, ?, ?, ?)", (title, author, description, genre, published_date, rating))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Book added successfully'}), 201

@app.route('/books/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def book(id):
    conn = sqlite3.connect('books.db')
    c = conn.cursor()

    if request.method == 'GET':
        c.execute("SELECT * FROM books WHERE id = ?", (id,))
        book = c.fetchone()
        conn.close()
        return jsonify(book)

    elif request.method == 'PUT':
        data = request.get_json()
        title = data['title']
        author = data['author']
        description = data['description']
        genre = data['genre']
        published_date = data['published_date']
        rating = data['rating']

        c.execute("UPDATE books SET title = ?, author = ?, description = ?, genre = ?, published_date = ?, rating = ? WHERE id = ?", (title, author, description, genre, published_date, rating, id))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Book updated successfully'})

    elif request.method == 'DELETE':
        c.execute("DELETE FROM books WHERE id = ?", (id,))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Book deleted successfully'})

if __name__ == '__main__':
    create_db()
    app.run(debug=True, host='0.0.0.0', port=8000)