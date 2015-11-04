from datetime import datetime


def dump_datetime(datetime_obj):
    """
    Deserialize datetime object into string form for JSON processing.
    """
    if not isinstance(datetime_obj, datetime):
        return None

    # TODO:: add timezone handling
    return datetime_obj.strftime('%Y-%m-%d %H:%M:%S')
