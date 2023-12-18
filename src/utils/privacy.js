const privacyKey = 'privacyRGPD';

const setPrivacyKey = () => {
  localStorage.setItem(privacyKey, 'true');
};

const checkPrivacyKey = () => {
  if (localStorage.getItem(privacyKey) === 'true') {
    return true;
  }
  return false;
};

const deletePrivacy = () => {
  localStorage.clear();
}

export { setPrivacyKey, checkPrivacyKey, deletePrivacy };