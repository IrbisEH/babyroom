from . import Base
from sqlalchemy import String, Column, Integer
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from passlib.hash import pbkdf2_sha256

class UserModel(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    username: Mapped[str] = mapped_column(String(30), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)

    def set_password(self, password: str):
        self.password = pbkdf2_sha256.hash(password)

    def check_password(self, password: str):
        return pbkdf2_sha256.verify(password, self.password)
