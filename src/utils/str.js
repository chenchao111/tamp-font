export const trimStr = str => (str ? str.split(' ').join('') : str);

export const mobileCheck = mobile => /^[1][3,4,5,7,8,6,9][0-9]{9}$/.test(mobile);
