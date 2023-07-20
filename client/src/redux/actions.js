import axios from "axios";




export const GET_DOGS = "GET_DOGS";
export const GET_BY_NAME = "GET_BY_NAME";
export const CLEAR_SEARCH = "CLEAR_SEARCH";
export const GET_DETAILS = "GET_DETAILS";
export const CLEAN_DETAILS = "CLEAN_DETAILS";
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const TEMPERAMENT_FILTER = 'TEMPERAMENT_FILTER';
export const SORT_DOG = "SORT_DOG";


export function getDogs() {
  return async function(dispatch) {
    const json= await axios("http://localhost:3001/dogs");
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}


  export function getDogByName(name) {
    return async function (dispatch) {
      const json = await axios(`http://localhost:3001/dogs?name=${name}`); //respuesta del llamado a la api por nombre
      return dispatch({
        type: "GET_BY_NAME", // el tipo GET
        payload: json.data, //repuesta del llamado todo los dogs
      });
    };
  }

  export function getDetails(id) {
    return async function (dispatch){
        const json = await axios(`http://localhost:3001/dogs/${id}`)
        return dispatch({
          type:"GET_DETAILS",
          payload: json.data
        })
    }
  }

  export function getTemperaments(temperaments) {
    return async function(dispatch){
      const json = await axios('http://localhost:3001/temperaments')
      console.log(json)

      return dispatch({
        type:'GET_TEMPERAMENTS',
        payload: json.data
      })
    }
  }

  export function tempFilter(filter){
    return {
      type: TEMPERAMENT_FILTER,
      payload: filter
    }
  }

  export function sortDog(filterName){
    return{
      type: SORT_DOG,
      payload: filterName
    }
  }

  export function clearSearch() {
    return {type: CLEAR_SEARCH}
  }

