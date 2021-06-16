import { getEverything } from './newsApi';
import { getApiCall} from "../utils/apiCall";
import { API_KEY, EVERYTHING, RESULTS_LIMIT} from "../constants/newsApi";
import { EMPTY_STRING_ERROR } from '../constants/errors';
jest.mock('../utils/apiCall', () => ({getApiCall: jest.fn()}))
describe('getEverything', () =>{

    test('should return the correct data', async ()=>{
        const expected = 'test1234';
        getApiCall.mockImplementation(() =>
            Promise.resolve(expected)
        )
        const searchTerm = 'testing';
        const result = await getEverything(searchTerm)
        expect(result).toBe(expected);
        expect(getApiCall).toBeCalledWith(`https://newsapi.org/v2/${EVERYTHING}?q=${searchTerm}&pageSize=${RESULTS_LIMIT}&apiKey=${API_KEY}`)
    })

    test('should throw error', async ()=>{
        const expected = 'Error';
        const searchTerm = 'testing';
        getApiCall.mockImplementation(() =>
            Promise.reject(expected)
        )
        const err = await getEverything(searchTerm).catch(err => {
            return err
        })
        expect(err).toEqual(Error('Error'));
        expect(getApiCall).toBeCalledWith(`https://newsapi.org/v2/${EVERYTHING}?q=${searchTerm}&pageSize=${RESULTS_LIMIT}&apiKey=${API_KEY}`)
    })

    test('should throw error if string is empty', async ()=>{
        const searchTerm = ' ';
        const err = await getEverything(searchTerm);
        expect(err).toEqual(Error(EMPTY_STRING_ERROR));
        expect(getApiCall).toBeCalledTimes(0);
    })
})