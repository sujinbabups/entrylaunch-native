"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.ApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const application_schema_1 = require("./schema/application.schema");
let ApplicationsService = class ApplicationsService {
    constructor(applicationsRepository) {
        this.applicationsRepository = applicationsRepository;
    }
    create(createApplicationDto, candidateId) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobId = new mongoose_2.Types.ObjectId(createApplicationDto.jobId);
            const candidateObjectId = new mongoose_2.Types.ObjectId(candidateId);
            const existingApplication = yield this.applicationsRepository.findOne({
                jobId: jobId,
                candidateId: candidateObjectId,
            });
            if (existingApplication) {
                throw new common_1.ConflictException('You have already applied for this job');
            }
            const application = new this.applicationsRepository(Object.assign(Object.assign({}, createApplicationDto), { jobId: jobId, candidateId: candidateObjectId }));
            return application.save();
        });
    }
    findAllByCandidate(candidateId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.applicationsRepository
                .find({ candidateId: new mongoose_2.Types.ObjectId(candidateId) })
                .populate('job')
                .exec();
        });
    }
    findAllByEmployer(employerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.applicationsRepository
                .find()
                .populate({
                path: 'job',
                match: { employerId: new mongoose_2.Types.ObjectId(employerId) },
            })
                .populate('candidate')
                .exec();
        });
    }
    updateStatus(id, updateStatusDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const application = yield this.applicationsRepository.findById(id);
            if (!application) {
                throw new common_1.NotFoundException(`Application with ID ${id} not found`);
            }
            application.status = updateStatusDto.status;
            return application.save();
        });
    }
};
exports.ApplicationsService = ApplicationsService;
exports.ApplicationsService = ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(application_schema_1.Application.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ApplicationsService);
//# sourceMappingURL=applications.service.js.map