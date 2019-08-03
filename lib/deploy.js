"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var exec_1 = require("./lib/exec");
var log_1 = require("./lib/log");
var sleep_1 = require("./lib/sleep");
var step_1 = require("./lib/step");
function deploy(config, buildOutputPath) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            step_1.runStep("Checking for Azure CLI...", function () { return checkForAzCLI(); });
            step_1.runStep("Creating resource group...", function () { return createResourceGroup(config); });
            step_1.runStep("Creating creating storage account...", function () { return createStorage(config); });
            step_1.runStep("Creating function app...", function () { return createFunctionApp(config); });
            step_1.runStep("Uploading package & assets...", function () {
                return upload(config, buildOutputPath);
            });
            return [2 /*return*/];
        });
    });
}
exports.deploy = deploy;
function checkForAzCLI() {
    return __awaiter(this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, exec_1.execAsync("az --version")];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    exec_1.fail("Could not find Azure CLI. Please install from https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest", e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.checkForAzCLI = checkForAzCLI;
function createResourceGroup(config) {
    return __awaiter(this, void 0, void 0, function () {
        var subscriptionId, location, resourceGroup, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    subscriptionId = config.subscriptionId, location = config.location, resourceGroup = config.resourceGroup;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, exec_1.execAsync("az group create --subscription " + subscriptionId + " --name " + resourceGroup + " --location " + location)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    exec_1.fail("Could not create resource group", e_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createResourceGroup = createResourceGroup;
function createStorage(config) {
    return __awaiter(this, void 0, void 0, function () {
        var storageAccount, subscriptionId, location, resourceGroup, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    storageAccount = config.storageAccount, subscriptionId = config.subscriptionId, location = config.location, resourceGroup = config.resourceGroup;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, exec_1.execAsync("az storage account create --subscription " + subscriptionId + " --name " + storageAccount + " --location " + location + " --resource-group " + resourceGroup + " --sku Standard_LRS")];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    exec_1.fail("Could not create storage account", e_3);
                    return [3 /*break*/, 4];
                case 4:
                    log_1.log("Creating storage container...", log_1.LogLevel.Verbose);
                    try {
                    }
                    catch (e) {
                        exec_1.fail("Could not create storage container", e);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.createStorage = createStorage;
function createFunctionApp(config) {
    return __awaiter(this, void 0, void 0, function () {
        var subscriptionId, storageAccount, location, resourceGroup, name, ConfigName, e_4, result, appSettings, setting, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    subscriptionId = config.subscriptionId, storageAccount = config.storageAccount, location = config.location, resourceGroup = config.resourceGroup, name = config.name;
                    ConfigName = "WEBSITE_RUN_FROM_PACKAGE";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, exec_1.execAsync("az functionapp create --subscription " + subscriptionId + " --resource-group " + resourceGroup + " --consumption-plan-location " + location + " --name " + name + " --storage-account " + storageAccount + " --runtime node")];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _a.sent();
                    exec_1.fail("Could not create function app", e_4);
                    return [3 /*break*/, 4];
                case 4:
                    // Check if package deployment is already enabled
                    log_1.log("Enabling package deploy", log_1.LogLevel.Verbose);
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 8, , 9]);
                    return [4 /*yield*/, exec_1.execAsync("az functionapp config appsettings list --resource-group " + resourceGroup + " --name " + name)];
                case 6:
                    result = _a.sent();
                    if (result && result.stdout) {
                        appSettings = JSON.parse(result.stdout);
                        setting = appSettings.find(function (x) { return x.name === ConfigName; });
                        if (setting && setting.value === "1") {
                            log_1.log("Already enabled.", log_1.LogLevel.Verbose);
                            return [2 /*return*/];
                        }
                    }
                    return [4 /*yield*/, exec_1.execAsync("az functionapp config appsettings set --settings " + ConfigName + "=1 --resource-group " + resourceGroup + " --name " + name)];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_5 = _a.sent();
                    exec_1.fail("Could not enable package deployment", e_5);
                    return [3 /*break*/, 9];
                case 9: 
                // Wait before next step to give the service time to restart
                return [4 /*yield*/, sleep_1.sleep(5000)];
                case 10:
                    // Wait before next step to give the service time to restart
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createFunctionApp = createFunctionApp;
function upload(config, buildOutputPath) {
    return __awaiter(this, void 0, void 0, function () {
        var subscriptionId, resourceGroup, name, storageAccount, assetsContainerName, attempt, e_6, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    subscriptionId = config.subscriptionId, resourceGroup = config.resourceGroup, name = config.name, storageAccount = config.storageAccount, assetsContainerName = config.assetsContainerName;
                    attempt = 0;
                    _a.label = 1;
                case 1:
                    if (!(attempt < 3)) return [3 /*break*/, 9];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 8]);
                    return [4 /*yield*/, exec_1.execAsync("az functionapp deployment source config-zip --subscription " + subscriptionId + " -n " + name + " -g " + resourceGroup + " --src " + path_1.join(buildOutputPath, "package.zip"))];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 4:
                    e_6 = _a.sent();
                    if (!(attempt + 1 < 3)) return [3 /*break*/, 6];
                    log_1.log("Could not deploy package to Azure function app, waiting 5s and then retrying...");
                    return [4 /*yield*/, sleep_1.sleep(5000)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    exec_1.fail("Could not deploy package to Azure function app", e_6);
                    _a.label = 7;
                case 7: return [3 /*break*/, 8];
                case 8:
                    ++attempt;
                    return [3 /*break*/, 1];
                case 9:
                    _a.trys.push([9, 11, , 12]);
                    return [4 /*yield*/, exec_1.execAsync("az storage blob upload-batch --subscription " + subscriptionId + " --account-name " + storageAccount + " --destination " + assetsContainerName + " --source " + path_1.join(buildOutputPath, "assets"))];
                case 10:
                    _a.sent();
                    return [3 /*break*/, 12];
                case 11:
                    e_7 = _a.sent();
                    exec_1.fail("Could not upload assets to Azure blob storage", e_7);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    });
}
exports.upload = upload;
//# sourceMappingURL=deploy.js.map