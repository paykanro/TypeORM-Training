"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherController = void 0;
const typeorm_1 = require("typeorm");
const tools_1 = require("../tools");
const entities_1 = require("../entities");
const NAMESPACE = 'Teacher-Controller';
const ORMManager = (0, typeorm_1.getConnectionManager)();
const createTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, subject } = req.body;
    const teacherRepository = yield (0, typeorm_1.getRepository)(entities_1.Teacher);
    try {
        const newTeacher = new entities_1.Teacher();
        newTeacher.firstName = firstName;
        newTeacher.lastName = lastName;
        newTeacher.subject = subject;
        yield teacherRepository.save(newTeacher);
        res.status(200).send({ message: 'Teacher successfully created.' });
    }
    catch (err) {
        const customError = new tools_1.CustomError(400, 'ُServer', 'Internal Server Error', err);
        return next(customError);
    }
});
exports.TeacherController = {
    createTeacher
};
