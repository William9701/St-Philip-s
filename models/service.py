from sqlalchemy import Column, Integer, String, Text, Date, Time, ForeignKey, Float
from sqlalchemy.orm import relationship
from models.base_models import Basemodels, Base

class ServiceInfo(Basemodels, Base):
    __tablename__ = 'service_info'
    service_date = Column(Date, nullable=False)
    service_time = Column(Time, nullable=False)
    service_name = Column(String(100), nullable=False)
    liturgical_color = Column(String(20), nullable=False)
    special_celebration = Column(String(100))

    readings = relationship('ReadingSchedule', back_populates='service')
    prayers = relationship('SpecialPrayers', back_populates='service')
    hymns = relationship('Hymns', back_populates='service')
    notices = relationship('Notices', back_populates='service')
    weddings = relationship('Weddings', back_populates='service')
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

class ReadingSchedule(Basemodels, Base):
    __tablename__ = 'reading_schedule'
    service_id = Column(String(225), ForeignKey('service_info.id', ondelete='CASCADE'), nullable=False)
    lesson = Column(Integer)
    book_name = Column(String(50))
    chapter_and_verse = Column(String(50))
    reading_type = Column(String(50))  # e.g., First, Second Reading, Psalm

    service = relationship('ServiceInfo', back_populates='readings')
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

class SpecialPrayers(Basemodels, Base):
    __tablename__ = 'special_prayers'
    service_id = Column(String(225), ForeignKey('service_info.id', ondelete='CASCADE'), nullable=False)
    prayer_text = Column(Text)
    prayer_topic = Column(Text)
    prayer_name = Column(String(100))
    prayer_note = Column(Text)

    service = relationship('ServiceInfo', back_populates='prayers')
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

class Hymns(Basemodels, Base):
    __tablename__ = 'hymns'
    service_id = Column(String(225), ForeignKey('service_info.id', ondelete='CASCADE'), nullable=False)
    hymn_number = Column(String(225))
    hymn_title = Column(String(100))
    category = Column(String(50))  # Processional, Offertory, etc.

    service = relationship('ServiceInfo', back_populates='hymns')
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

class Notices(Basemodels, Base):
    __tablename__ = 'notices'
    service_id = Column(String(225), ForeignKey('service_info.id', ondelete='CASCADE'), nullable=False)
    notice_text = Column(Text)
    notice_type = Column(String(50))

    service = relationship('ServiceInfo', back_populates='notices')
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

class Weddings(Basemodels, Base):
    __tablename__ = 'weddings'
    service_id = Column(String(225), ForeignKey('service_info.id', ondelete='CASCADE'), nullable=False)
    text = Column(Text)
    message = Column(Text)

    service = relationship('ServiceInfo', back_populates='weddings')
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


class Members(Basemodels, Base):
    __tablename__ = 'members'
    first_name = Column(String(225), nullable=False)
    title = Column(String(225), nullable=False)
    last_name = Column(String(225), nullable=False)
    group_name = Column(String(225), nullable=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


class SubScribed_Members(Basemodels, Base):
    __tablename__ = 'subscribed_members'
    name = Column(String(225), nullable=False)
    email = Column(String(225), nullable=False)
    subject = Column(Text)
    message = Column(Text)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

class UpcomingEvent(Basemodels, Base):
    __tablename__ = 'events' #upcoming events
    event_name = Column(String(225), nullable=False)
    time = Column(String(225), nullable=False)
    event_text = Column(String(225), nullable=False)
    event_img = Column(String(225), nullable=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

