import { GET_DOGS, GET_BY_NAME, GET_DETAILS, TEMPERAMENT_FILTER, GET_TEMPERAMENTS, SORT_DOG} from "./actions";
const initialState = {
  dogs: [],
  searchResults: [],
  dogCopy: [],
  dogOrder: [],
  temperaments: [],
  details: {},
  filter: "all"
};

function Reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        dogCopy: action.payload,
        dogOrder: action.payload
      }
    case GET_BY_NAME:
      return{
        ...state,
        dogs: action.payload,
        searchResults: action.payload
      }
      case GET_DETAILS:
        return{
          ...state,
          details: action.payload
        }

     case GET_TEMPERAMENTS:
      return{
        ...state,
        temperaments : action.payload.slice(0, 20)
      }
    case TEMPERAMENT_FILTER:
      if(action.payload === "all"){
        return {
          ...state,
          dogs: state.dogCopy,
          filter: action.payload
        }
      } else {
        return{
          ...state,
          filter: action.payload,
          dogs: state.dogCopy.filter((d) => {
            return d.temperament.filter((t) => t === action.payload).length
          })
        }
      }

      case SORT_DOG:
        if (action.payload === "aToZ") {
          return {
            ...state,
            dogs: [...state.dogCopy].sort((a, b) =>
              a.name.localeCompare(b.name)
            ),
          };
        }
        if (action.payload === "zToA") {
          return {
            ...state,
            dogs: [...state.dogCopy]
              .sort((a, b) => a.name.localeCompare(b.name))
              .reverse(),
          };
        }
        if (action.payload === "weightDesc") {
          return {
            ...state,
            dogs: [...state.dogCopy].sort((a, b) => {
             return a.weight.split(" - ")[1] - b.weight.split(" - ")[1]
            }),
          };
        }
        if (action.payload === "weightAsc") {
          return {
            ...state,
            dogs: [...state.dogCopy].sort((a, b) => {
             return b.weight.split(" - ")[1] - a.weight.split(" - ")[1]
            }),
          };
        }
        default:
          return state;
  }
};

export default Reducer;