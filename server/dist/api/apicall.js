"use strict";
// apicall.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClaimScore = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 * Fetches the claim score from the ClaimBuster API.
 *
 * @param inputClaim - The claim text to be scored.
 * @returns The JSON response from the API.
 * @throws An error if the API request fails.
 */
const getClaimScore = (inputClaim) => __awaiter(void 0, void 0, void 0, function* () {
    const apiKey = '02ac743e6570462e9bf5014e5293ca03';
    const url = `https://idir.uta.edu/claimbuster/api/v2/score/text/${encodeURIComponent(inputClaim)}`;
    try {
        const response = yield axios_1.default.get(url, {
            headers: {
                'x-api-key': apiKey,
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getClaimScore = getClaimScore;
