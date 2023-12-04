const { default: instance } = require("utils/axiosCutomize");
const fetchAllSchedule = (limit = 100, offset = 0) => {
  return instance.get("api/schedules/?limit=" + limit + "&offset=" + offset);
};
const fetchAllScheduleByDoctorId = (doctorId, limit = 10, offset = 0) => {
  return instance.get(
    "api/schedulerdoctor/?doctor=" +
      doctorId +
      "&limit=" +
      limit +
      "&offset=" +
      offset,
  );
};
const addScheduleDoctor = (doctorId, scheduleId) => {
  console.log("add: doctorid" + doctorId + " scheduleid: " + scheduleId);
  return instance.post("api/schedulerdoctor/", {
    doctor_id: doctorId,
    schedule_id: scheduleId,
  });
};
const deleteScheduleDoctor = (scheduleDoctorId) => {
  return instance.delete("api/schedulerdoctor/" + scheduleDoctorId + "/");
};
const editDoctorInformation = (
  id,
  name,
  phone,
  address,
  years_of_experience,
  birthday,
  gender,
) => {
  return instance.patch(`/api/doctors/${id}/`, {
    name,
    phone,
    address,
    years_of_experience,
    birthday,
    gender,
  });
};
const getBlog = (id, name, id_category) => {
  return instance.get(
    `/api/search_blog/?id_category=${id_category}&name=${name}&id_doctor=${id}`,
  );
};
const addBlog = (id_category, id_doctor, title, content) => {
  return instance.post("/api/blogcruds/", {
    id_category,
    id_doctor,
    title,
    content,
  });
};
const deleteBlog = (id_blog, id_category, id_doctor, title, content) => {
  return instance.delete(`/api/blogcruds/${id_blog}/`, {
    id_category,
    id_doctor,
    title,
    content,
  });
};
const editBlog = (id_blog, id_category, id_doctor, title, content) => {
  return instance.patch(`/api/blogcruds/${id_blog}/`, {
    id_category,
    id_doctor,
    title,
    content,
  });
};
const addSpecialty = (specialty_id, doctor_id) => {
  return instance.post("/api/specialtydoctor/", { specialty_id, doctor_id });
};
const getSpecialtyByName = (name, id_doctor) => {
  return instance.get(
    `/api/search_specialty666/?name=${name}&id_doctor=${id_doctor}`,
  );
};
const getServiceByName = (name, id_doctor) => {
  return instance.get(
    `/api/search_service666/?name=${name}&id_doctor=${id_doctor}`,
  );
};
const addService = (service_id, doctor_id) => {
  return instance.post("/api/servicedoctors/", { service_id, doctor_id });
};
const getDoctorAppoinment = (id) => {
  return instance.get(`/api/appointments?doctor_id=${id}`);
};
export {
  editDoctorInformation,
  getBlog,
  addBlog,
  deleteBlog,
  editBlog,
  fetchAllSchedule,
  fetchAllScheduleByDoctorId,
  addScheduleDoctor,
  deleteScheduleDoctor,
  addSpecialty,
  getSpecialtyByName,
  getServiceByName,
  addService,
  getDoctorAppoinment,
};