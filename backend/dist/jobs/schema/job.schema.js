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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobSchema = exports.Job = exports.JobType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../users/schema/user.schema");
var JobType;
(function (JobType) {
    JobType["FULL_TIME"] = "full-time";
    JobType["PART_TIME"] = "part-time";
    JobType["CONTRACT"] = "contract";
    JobType["INTERNSHIP"] = "internship";
})(JobType || (exports.JobType = JobType = {}));
let Job = class Job {
};
exports.Job = Job;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Job.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Job.prototype, "company", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Job.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Job.prototype, "salary", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: JobType, default: JobType.FULL_TIME }),
    __metadata("design:type", String)
], Job.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Job.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Job.prototype, "requirements", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Job.prototype, "employerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], Job.prototype, "employer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Application' }] }),
    __metadata("design:type", Array)
], Job.prototype, "applications", void 0);
exports.Job = Job = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Job);
exports.JobSchema = mongoose_1.SchemaFactory.createForClass(Job);
//# sourceMappingURL=job.schema.js.map