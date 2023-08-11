import api from "@/common/API";
import axios from "axios";

export function activeLink(path: string, pathname: string) {
  const regex = new RegExp(`^${path}(\/.*)?$`);
  return regex.test(pathname);
}

export function GenerateID(prefix: string) {
  const randomDigits = Array(8)
    .fill(0)
    .map((e, i) => (e = (Math.random() * 10) | 0));
  return prefix + randomDigits.join("");
}

export function classifyDate(date1: string, date2: string){
 console.log(date1,date2,'date one and two')
 let day1 = Number(date1.split('-')[2] )
 let day2 = Number(date2.split('-')[2]) 

 let month1 = Number(date1.split('-')[1]) 
 let month2 = Number(date2.split('-')[1]) 

 let y1 = Number(date1.split('-')[0]) 
 let y2 = Number(date2.split('-')[0]) 

//Today
if(day1 === day2 && month1 === month2 && y1 === y2){
  return 'Today'
}else if(day1-day2 === 1 && month1 === month2  && y1 === y2){
  return 'Yesterday'
}else if(day2 > day1 && day2 <= day1 + 7 && month1 === month2  && y1 === y2){
  return "Current Week"
}else if(day2 < day1-1 && day2 >= day1 - 7 && month1 === month2  && y1 === y2){
  return "Previous Week"
}else if(month1 === month2  && y1 === y2){
  return "Current Month"
}else if(month1>month2  && y1 === y2){
  return "Previous Month"
}
 
}
// Today

// Yesterday

// Current Week

// Previous Week

// Current Month

// Previous Month