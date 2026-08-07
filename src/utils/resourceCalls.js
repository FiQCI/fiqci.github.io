const RESOURCE_CALL = 'resource call';

//Dates are rendered by Jekyll as d.m.yyyy
export const parseSiteDate = date => {
    const [day, month, year] = (date || '').split('.').map(Number);
    return new Date(year, month - 1, day).getTime() || 0;
};

export const isResourceCall = type =>
    (type || '').split(',').map(value => value.trim().toLowerCase()).includes(RESOURCE_CALL);

export const newestResourceCall = (items, getType = item => item.type) =>
    items
        .filter(item => isResourceCall(getType(item)))
        .reduce((latest, item) => (!latest || parseSiteDate(item.date) >= parseSiteDate(latest.date) ? item : latest), null);
