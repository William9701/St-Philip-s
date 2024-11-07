#!/usr/bin/env python3
"""
auth file
"""

import bcrypt
from models.engine.db_storage import DBStorage
from models.admin import Admin
from sqlalchemy.orm.exc import NoResultFound
import uuid


def _hash_password(password: str) -> bytes:
    """ hash a password"""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt)


def _generate_uuid() -> str:
    """Generate a new UUID."""
    new_uuid = uuid.uuid4()
    return str(new_uuid)


class Auth:
    """Auth class to interact with the authentication database.
    """

    def __init__(self):
        """the init class"""
        self._db = DBStorage()
        
    
    def register_admin(self, email: str, password: str, username: str) -> Admin:
        """register a admin"""
        try:
            existing_admin = self._db.find_admin_by(email=email)
            raise ValueError(f"admin {existing_admin.email} already exists.")
        except NoResultFound:
            # If NoResultFound is raised, it means the admin doesn't exist,
            # so proceed with registration.
            pass
        if isinstance(password, str):
            password = _hash_password(password)

        return self._db.add_admin(email=email, hashed_password=password, username=username)

    def valid_login_a(self, email: str, password: str) -> bool:
        """Validates login details."""
        try:
            existing_admin = self._db.find_admin_by(email=email)
            hashed_password_bytes = existing_admin.hashed_password.encode(
                'utf-8')

            if bcrypt.checkpw(password.encode('utf-8'),
                              hashed_password_bytes):
                return True
            return False
        except NoResultFound:
            return False

    def create_session_a(self, email: str) -> str:
        """this method  takes an email string argument and returns the
        session ID as a string"""
        try:
            admin = self._db.find_admin_by(email=email)
            session_uuid = _generate_uuid()
            self._db.update_admin(admin.id, session_id=session_uuid)
            return session_uuid
        except NoResultFound:
            return None

    def destroy_session_a(self, admin_id: int) -> None:
        """destroys a session"""
        try:
            self._db.update_admin(admin_id, session_id=None)
        except NoResultFound:
            return None

    def get_admin_from_session_id(self, session_id: str) -> Admin or None:  # type: ignore
        """this method  takes a single session_id string argument and
        returns the corresponding admin or None"""
        try:
            admin = self._db.find_admin_by(session_id=session_id)
            return admin
        except NoResultFound:
            return None

    def get_reset_password_token_a(self, email: str) -> str:
        """gets to reset the password"""
        try:
            admin = self._db.find_admin_by(email=email)
            uu_id = _generate_uuid()
            self._db.update_admin(admin.id, reset_token=uu_id)
            return uu_id
        except NoResultFound:
            raise ValueError('admin does not exist')

    def update_password_a(self, reset_token: str, password: str) -> None:
        """Update password"""
        try:
            admin = self._db.find_admin_by(reset_token=reset_token)
            hashed_pwd = _hash_password(password)
            self._db.update_admin(admin.id, hashed_password=hashed_pwd,
                                  reset_token=None)
        except NoResultFound:
            raise ValueError('admin not found')
