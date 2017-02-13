const AUDIO = document.createElement('audio');
AUDIO.src = 'mp3/SoundTrack.mp3';
AUDIO.load();
AUDIO.autoplay = true;

/*----------  INITIAL STATE  ----------*/
const initialState = {
  songPlaying: true
};

/*----------  ACTION TYPES  ----------*/
const START_PLAYING = 'START_PLAYING';
const STOP_PLAYING = 'STOP_PLAYING';

/*----------  ACTION CREATORS  ----------*/
export const play = () => {
  AUDIO.play();
  return {
    type: START_PLAYING
  };
};

export const pause = () => {
  AUDIO.pause();
  return {
    type: STOP_PLAYING
  };
};

export const toggleSong = () => {
  return (dispatch, getState) => {
    const currentState = getState().musicPlayer;
    if (!currentState.songPlaying) {
      dispatch(play());
    } else {
      dispatch(pause());
    }
  };
};

/*----------  THUNK CREATORS  ----------*/

/*----------  REDUCER  ----------*/
export default function (state = initialState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case START_PLAYING:
      newState.songPlaying = true;
      break;

    case STOP_PLAYING:
      newState.songPlaying = false;
      break;

    default:
      return state;

  }

  return newState;

}
