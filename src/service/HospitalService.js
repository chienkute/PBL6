const { default: instance } = require("utils/axiosCutomize");
const editHospital = (id, name, email, address, info) => {
  return instance.patch(`/api/hospitals/${id}/`, {
    name,
    email,
    address,
    info,
  });
};
const addDoctor = (username, password, email) => {
  return instance.post(`/api/auth/register/doctor/`, {
    username,
    password,
    email,
  });
};
const deleteDocotor = (id) => {
  return instance.delete(`/api/doctors/${id}/`);
};
const editHospitalUserName = (username, id) => {
  return instance.patch(`/api/accounts/${id}/`, { username });
};

export { editHospital, addDoctor, deleteDocotor, editHospitalUserName };
