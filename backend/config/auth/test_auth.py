import requests


def test_register():
    url = 'http://localhost:5000/register'
    data = {
        'full_name': 'John Doe',
        'mail': 'johndoe@example.com',
        'password': 'mypassword',
        'active_token': '',
        'role': 'user',
        'address': '123 Main St'
    }

    response = requests.post(url, json=data)
    print(response.status_code)  # should output 201
    print(response.json())  # should output {"message": "User registered successfully!"}

def test_login():
    url = 'http://localhost:5000/login'
    data = {
        'full_name': 'John Doe',
        'password': 'mypassword'
    }

    response = requests.post(url, json=data)
    print(response.status_code)  # should output 200 if used has been registered
    print(response.json())  # should output a JWT token
    return response.json()
    
def test_logout():
    url = 'http://localhost:5000/logout'
    data = test_login()
    token = data['token']

    response = requests.post(url, json=data, headers={"Authorization": f"Bearer {token}"})
    
    print(response.status_code)
    print(response.json())

if __name__ == '__main__':
    test_register()
    test_login()
    test_logout()