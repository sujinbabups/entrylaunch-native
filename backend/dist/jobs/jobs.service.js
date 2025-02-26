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
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const job_schema_1 = require("./schema/job.schema");
let JobsService = class JobsService {
    constructor(jobsRepository) {
        this.jobsRepository = jobsRepository;
    }
    create(createJobDto, employerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = new this.jobsRepository(Object.assign(Object.assign({}, createJobDto), { employerId: new mongoose_2.Types.ObjectId(employerId) }));
            return job.save();
        });
    }
    findAll(searchDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {};
            if (searchDto.search) {
                query.$or = [
                    { title: { $regex: searchDto.search, $options: 'i' } },
                    { company: { $regex: searchDto.search, $options: 'i' } },
                    { location: { $regex: searchDto.search, $options: 'i' } },
                ];
            }
            if (searchDto.type) {
                query.type = searchDto.type;
            }
            if (searchDto.location) {
                query.location = searchDto.location;
            }
            const jobs = yield this.jobsRepository
                .find(query)
                .sort({ createdAt: -1 })
                .skip(searchDto.skip || 0)
                .limit(searchDto.take || 10)
                .exec();
            const total = yield this.jobsRepository.countDocuments(query);
            return [jobs, total];
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield this.jobsRepository.findById(new mongoose_2.Types.ObjectId(id)).exec();
            if (!job) {
                throw new common_1.NotFoundException(`Job with ID ${id} not found`);
            }
            return job;
        });
    }
    update(id, updateJobDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield this.jobsRepository.findByIdAndUpdate(new mongoose_2.Types.ObjectId(id), updateJobDto, { new: true }).exec();
            if (!job) {
                throw new common_1.NotFoundException(`Job with ID ${id} not found`);
            }
            return job;
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.jobsRepository.findByIdAndDelete(new mongoose_2.Types.ObjectId(id)).exec();
            if (!result) {
                throw new common_1.NotFoundException(`Job with ID ${id} not found`);
            }
        });
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(job_schema_1.Job.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], JobsService);
//# sourceMappingURL=jobs.service.js.map