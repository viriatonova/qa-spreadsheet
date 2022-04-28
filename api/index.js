import * as XLSX from 'xlsx/xlsx.mjs';
import * as fs from 'fs';
import * as cpexcel from 'xlsx/dist/cpexcel.full.mjs';
import { Readable } from 'stream';
import { name1, name2 } from "./dados.js"

XLSX.stream.set_readable(Readable);
XLSX.set_fs(fs);
XLSX.set_cptable(cpexcel);


function capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateName(name1, name2){
	const name = capFirst(
        name1[getRandomInt(0, name1.length + 1)]) + ' ' + capFirst(name2[getRandomInt(0, name2.length + 1)]
        );
	return name;
}

function amountNames(amount, name1, name2) {
    const namesList = [];
    for (let i = 0; i < amount; i++) {
        namesList.push(generateName(name1, name2));
    }
    return namesList;
}

function generateEmails (listName) {
    const emailList = []
    for (let i = 0; i < listName.length; i++) {
       emailList.push(`${listName[i].replace(/\s/g, '')}@mailinator.com`); 
    }
    return emailList;
}

function getSheet(namesList, emailList, amount) {
    const workSheetData = [
        [
            "Nome", "E-mail", "Nome do usuário", "Senha", 
            "Perfil", "Ramificação", "Ramificação Específica", 
            "CPF", "UF", "Data", "Aniversário", "TASK"
        ],
    ];

    let data = []
    
    for(let i = 0; i <= amount; i++) {
        data.push(namesList[i]);
        data.push(emailList[i]);
        workSheetData.push(data);
        data = []
    }

    return workSheetData;
}


const argv = process.argv
const amount = argv[2]
const namesList = amountNames(amount, name1, name2);
const emailsList = generateEmails(namesList);
const workSheetData = getSheet(namesList, emailsList, amount)
const workBook = XLSX.utils.book_new();
const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
XLSX.utils.book_append_sheet(workBook, workSheet, "Worksheet" )
XLSX.writeFileXLSX(workBook, "out.xlsx");




