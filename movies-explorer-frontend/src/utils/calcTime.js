export function formatDuration(min) {
  let s = min * 60;
  if (s===0) return '';

  let years = Math.floor(s/31536000);
  let days = Math.floor(s/86400)>364 ? Math.floor((s-(years*31536000))/86400) : Math.floor(s/86400);
  let hours = Math.floor(s/3600)>23 ? Math.floor(((s-(years*31536000))-(days*86400))/3600) : Math.floor(s/3600);
  let minutes = Math.floor(s/60)>59 ? Math.floor((((s-(years*31536000))-(days*86400))-(hours*3600))/60) : Math.floor(s/60);
  let seconds = (((s-(years*31536000))-(days*86400))-(hours*3600))-(minutes*60);

  years = years===0 ? '' : (years>=1 && years<=4) ? years+'г' : years+'л';
  days = days===0 ? '' : days+'д';
  hours = hours===0 ? '' : hours+'ч';
  minutes = minutes===0 ? '' : minutes+'м';
  seconds = seconds===0 ? '' : seconds+'с';

  const arr = [years, days, hours, minutes, seconds].filter(x=>x!=='');

  switch(true) {
    case arr.length===1 : return arr[0];
    case arr.length===2 : return `${arr[0]}${arr[1]}`;
    case arr.length===3 : return `${arr[0]}${arr[1]}${arr[2]}`;
    case arr.length===4 : return `${arr[0]}${arr[1]}${arr[2]}${arr[3]}`;
    case arr.length===5 : return `${arr[0]}${arr[1]}${arr[2]}${arr[3]}${arr[4]}`;
    default :
      return '';
  }
}