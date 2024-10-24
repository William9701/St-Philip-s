
from models.base_models import Basemodels, Base

import models
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from os import getenv
from sqlalchemy.orm.session import Session
from sqlalchemy.exc import InvalidRequestError
from sqlalchemy.orm.exc import NoResultFound
from dotenv import load_dotenv
from models.admin import Admin
from models.service import *
import models.service as service_module
import inspect

# Add all classes from models.service to the dictionary
classes = {
    "Admin": Admin
}

for name, obj in inspect.getmembers(service_module):
    # Check if the object is a class and is defined in the service module
    if inspect.isclass(obj) and obj.__module__ == service_module.__name__:
        # Add the class to the classes dictionary
        classes[name] = obj


load_dotenv()


class DBStorage:
    """interaacts with the MySQL database"""
    __engine = None
    __session = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        Church_MYSQL_USER = getenv('Church_MYSQL_USER')
        Church_MYSQL_PWD = getenv('Church_MYSQL_PWD')
        Church_MYSQL_HOST = getenv('Church_MYSQL_HOST')
        Church_MYSQL_DB = getenv('Church_MYSQL_DB')
        Church_ENV = getenv('Church_ENV')
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.
                                      format(Church_MYSQL_USER,
                                             Church_MYSQL_PWD,
                                             Church_MYSQL_HOST,
                                             Church_MYSQL_DB))
        if Church_ENV == "test":
            Base.metadata.drop_all(self.__engine)

    @property
    def _session(self) -> Session:
        """Memoized session object
        """
        if self.__session is None:
            DBSession = sessionmaker(bind=self.__engine)
            self.__session = DBSession()
        return self.__session

    def all(self, cls=None):
        """query on the current database session"""
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return new_dict

    def new(self, obj):
        """add the object to the current database session"""
        self.__session.add(obj)

    def save(self):
        """commit all changes of the current database session"""
        print('i am strorage called')
        self.__session.commit()

    def close(self):
        """call remove() method on the private session attribute"""
        self.__session.remove()

    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        if obj is not None:
            self.__session.delete(obj)

    def rollback(self):
        """ Roll back a session"""
        self.__session.rollback()

    def reload(self):
        """reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def get(self, cls, id):
        """
        Returns the object based on the class name and its ID, or
        None if not found
        """
        if cls not in classes.values():
            return None

        all_cls = models.storage.all(cls)
        for value in all_cls.values():
            if value.id == id:
                return value

        return None

    

    def count(self, cls=None):
        """
        count the number of objects in storage
        """
        if cls is None:
            count = 0
            for clas in classes.values():
                count += len(models.storage.all(clas).values())
        else:
            count = len(models.storage.all(cls).values())

        return count

    

    
    def add_admin(self, email: str, hashed_password: str, first_name: str, last_name: str) -> Admin:
        """This is the add admin method"""

        new_admin = Admin(email=email, hashed_password=hashed_password,
                          first_name=first_name, last_name=last_name)
        print(new_admin.id)
        self._session.add(new_admin)
        self._session.flush()  # flush the changes to the database
        self._session.commit()
        self._session.refresh(new_admin)  # refresh the admin instance
        return new_admin

    def find_admin_by(self, **kwargs) -> Admin:
        """This method takes in arbitrary keyword arguments and returns
        the first row found in the admins table as filtered by the
        method’s input arguments"""
        try:
            # Construct the query dynamically based on kwargs
            query = self._session.query(Admin).filter_by(**kwargs)

        except InvalidRequestError:
            # If there is an invalid request error, raise it with a
            # meaningful message
            raise InvalidRequestError

        if query:
            # Get the first result or raise NoResultFound
            admin_instance = query.one()

            return admin_instance
        else:
            # If no results are found, raise NoResultFound
            raise NoResultFound

    def update_admin(self, admin_id: int, **kwargs) -> None:
        """This is a method that takes as argument a required admin_id
        integer and arbitrary keyword arguments, and returns None"""
        admin = self.find_admin_by(id=admin_id)
        if kwargs:
            for key, value in kwargs.items():
                if hasattr(admin, key):
                    setattr(admin, key, value)
                else:
                    raise ValueError(f"Invalid attribute: {key}")

        # Commit changes to the database
        self._session.commit()
