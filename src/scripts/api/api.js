import axios from "axios";

function getAPI(url) {
  return axios.get(url);
}

function postAPI(url, data) {
  return axios.post(
    url,
    data
  );
}

function deleteAPI(url, data) {
  return axios.delete(
    url,
    data
  );
}

export function getAllProject() {
  return getAPI("/project").then(response => {
    return Promise.resolve(response.data);
  }).catch(error => {
    console.log(error);
  });
}

export function getAllBids() {
  return getAPI("/project/bids").then(response => {
    return Promise.resolve(response.data);
  }).catch(error => {
    console.log(error);
  });
}

export function getAllBidders() {
  return getAPI("/project/bidders").then(response => {
    return Promise.resolve(response.data);
  }).catch(error => {
    console.log(error);
  });
}

export function postProject(projectList, projectData) {
  return postAPI("/project", {
    projectList,
    projectData
  }).then(response => {
    return Promise.resolve(response.data);
  });
}

export function postBid(projectBids, bidData) {
  return postAPI("/project/bid", {
    projectBids,
    bidData
  }).then(response => {
    return Promise.resolve(response.data);
  });
}
