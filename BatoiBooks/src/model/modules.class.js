import Module from './module.class.js';

export default class Modules{
    constructor(){
        this.data = [];
    }

    populate(array){
        this.data = array.map(modul => new Module(modul.code, modul.cliteral, modul.vliteral, modul.courseId));
    }

    getModuleByCode(moduleCode){
        let mod = this.data.find(modul => modul.code === moduleCode);
    
        if(mod != null && mod != undefined){
            return mod;
        }else{
            throw new Error('No se ha encontrado el modulo');
        }
    }

    toString(){
        return this.data.map(modul => modul.toString()).join('\n');
    }
}