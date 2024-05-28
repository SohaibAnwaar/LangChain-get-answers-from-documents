# Django Project Setup

## Step 1: Create a Python Virtual Environment
First, create and activate a virtual environment for your project:

```bash
python3 -m venv venv
source venv/bin/activate  
# On Windows use 
`venv\Scripts\activate`
```

## Step 2: Install Requirements
Next, install the required Python packages using the `requirements.txt` file:

```bash
pip install -r requirements.txt
```

## Step 3: Apply Migrations
Apply the initial migrations to set up the database:

```bash
python manage.py migrate
```

## Step 4: Run the Django Development Server
Finally, start the Django development server:

```bash
python manage.py runserver
```

## Note
Ensure you have Python and pip installed on your system before starting these steps.


## Step 5: Setup the Frontend:
use instructions in the link below to setup the Frontend:
[fe/README.md](fe/README.md)
