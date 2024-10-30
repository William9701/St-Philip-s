from sqlalchemy import DECIMAL, Column, Integer, String, Text, Date, Time, ForeignKey, Float
from sqlalchemy.orm import relationship
from models.base_models import Basemodels, Base

class ServiceInfo(Basemodels, Base):
    __tablename__ = 'service_info'
    service_date = Column(Date, nullable=False)
    Csunday_time = Column(String(50), nullable=False)
    FirstServiceTime = Column(String(50), nullable=False)
    SecondServiceTime = Column(String(50), nullable=False)
    service_name = Column(String(100), nullable=False)
    liturgical_color = Column(String(20), nullable=False)
    special_celebration = Column(String(100))
    sunday_name = Column(String(100))
    FirstServiceStyle = Column(String(100))
    SecondServiceStyle = Column(String(100))
    CombinedServiceStyle = Column(String(100))

    readings = relationship('ReadingSchedule', back_populates='service')
    meditations = relationship('Meditation', back_populates='service')
    hymns = relationship('Hymns', back_populates='service')
    notices = relationship('Notices', back_populates='service')
    thanksgiving = relationship('SpecialThanksgiving', back_populates='service')
    aob = relationship('AOB', back_populates='service')
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

class ReadingSchedule(Basemodels, Base):
    __tablename__ = 'reading_schedule'
    service_id = Column(String(225), ForeignKey('service_info.id', ondelete='CASCADE'), nullable=False)
    first_lesson = Column(String(225))
    second_lesson = Column(String(50))
    espistle = Column(String(225))
    gospel = Column(String(225))
    psalm = Column(String(225))
    SecServicePsalm = Column(String(225))
    OldTestament = Column(String(225))

    service = relationship('ServiceInfo', back_populates='readings')
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

class Meditation(Basemodels, Base):
    __tablename__ = 'meditation'
    service_id = Column(String(225), ForeignKey('service_info.id', ondelete='CASCADE'), nullable=False)
    text = Column(Text)
    topic = Column(Text)
    note = Column(Text)

    service = relationship('ServiceInfo', back_populates='meditations')
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

class Hymns(Basemodels, Base):
    __tablename__ = 'hymns'
    service_id = Column(String(225), ForeignKey('service_info.id', ondelete='CASCADE'), nullable=False)
    processional = Column(String(225))
    gradual = Column(String(225))
    SecondServicegradual = Column(String(225))
    communion = Column(String(225))
    Recessional = Column(String(225))
    sermon = Column(String(225))

    service = relationship('ServiceInfo', back_populates='hymns')
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


class SpecialThanksgiving(Basemodels, Base):
    __tablename__ = 'special_thanksgiving'
    service_id = Column(String(225), ForeignKey('service_info.id', ondelete='CASCADE'), nullable=False)
    text = Column(Text)
    second_service_text = Column(Text)

    service = relationship('ServiceInfo', back_populates='thanksgiving')
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

class AOB(Basemodels, Base):
    __tablename__ = 'aob'
    service_id = Column(String(225), ForeignKey('service_info.id', ondelete='CASCADE'), nullable=False)
    text = Column(Text)
    aob1 = Column(Text)
    aob2 = Column(Text)

    service = relationship('ServiceInfo', back_populates='aob')
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

class Notices(Basemodels, Base):
    __tablename__ = 'notices'
    service_id = Column(String(225), ForeignKey('service_info.id', ondelete='CASCADE'), nullable=False)
    title = Column(String(255), nullable=False)
    content = Column(Text)

    service = relationship('ServiceInfo', back_populates='notices')


    schedules = relationship('NoticeSchedule', back_populates='notice', cascade="all, delete-orphan")
    prayers = relationship('PrayerList', back_populates='notice', cascade="all, delete-orphan")
    marriages = relationship('MarriageBann', back_populates='notice', cascade="all, delete-orphan")
    resources = relationship('ChurchResource', back_populates='notice', cascade="all, delete-orphan")
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


# Define the NoticeSchedule model
class NoticeSchedule(Basemodels, Base):
    __tablename__ = 'notice_schedule'
    notice_id = Column(String(225), ForeignKey('notices.id', ondelete='CASCADE'))
    event_day = Column(String(225), nullable=False)
    event_description = Column(Text)

    notice = relationship('Notices', back_populates='schedules')
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


# Define the ChurchResource model
class ChurchResource(Basemodels, Base):
    __tablename__ = 'church_resources'
    notice_id = Column(String(225), ForeignKey('notices.id', ondelete='CASCADE'))
    description = Column(Text)
    cost_church_member = Column(DECIMAL(10, 2))
    cost_non_member = Column(DECIMAL(10, 2))

    notice = relationship('Notices', back_populates='resources')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)



# Define the PrayerList model
class PrayerList(Basemodels, Base):
    __tablename__ = 'prayer_list'
    notice_id = Column(String(225), ForeignKey('notices.id', ondelete='CASCADE'))
    family_name = Column(String(255))

    notice = relationship('Notices', back_populates='prayers')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)




class MarriageBann(Basemodels, Base):
    __tablename__ = 'marriage_banns'
    service_id = Column(String(225), ForeignKey('service_info.id', ondelete='CASCADE'), nullable=False)
    notice_id = Column(String(225), ForeignKey('notices.id', ondelete='CASCADE'))
    groom_name = Column(String(255))
    bride_name = Column(String(255))
    bann_announcement_count = Column(String(255))

    notice = relationship('Notices', back_populates='marriages')

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
    event_date = Column(Date, nullable=False) 
    event_text = Column(String(225), nullable=False)
    event_img = Column(String(225), nullable=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

