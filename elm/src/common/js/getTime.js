export function getTime_(date){
  // let date=new Date(t),
let year=date.getFullYear()+'-',
  month=date.getMonth()+1<10?'0'+date.getMonth()+1+'-':date.getMonth()+1+'-',
  day=date.getDay()<10?'0'+date.getDay()+'-':date.getDay()+'-',
  hour=date.getHours()<10?'0'+date.getHours()+'-':date.getHours()+'-',
  minute=date.getMinutes()<10?'0'+date.getMinutes()+'-':date.getMinutes();
return year+month+day+hour+minute;
}
