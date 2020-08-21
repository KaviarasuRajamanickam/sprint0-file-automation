const fs = require('fs');
const csv = require('csv-parser');

let getAnonymizeInfo = () => {
    return {
        users: {
            // integration_id:{
            //     validation: 'required',
            //     anonymize_data: 'i_1234_' 
            // },
            integration_id: 'i_1234_',
            family_name: 'lname_1234',
            middle_name: 'mname_1234',
            given_name: 'fname_1234',
            email: 'success@simulator.amazonses.com',
            secondary_email: 'success@simulator.amazonses.com',
            student_id: 'sid_1234',
            user_id: 'u_1234',
            birth_dt: {
                min_date: '1965-01-01',
                max_date: '2002-12-31'
            },
            b_phone: '+17031234321',
            m_phone: '+17031234321',
            home_city: 'home_city_1234',
            home_state: 'home_state_1234',
            home_zip: 'home_zip_1234',
            home_county: 'home_county_1234',
            anonymize_fields: ['integration_id', 'family_name', 'middle_name', 'given_name', 'email', 'secondary_email', 'student_id', 'user_id', 'birth_dt', 'b_phone', 'm_phone', 'home_city', 'home_state', 'home_zip', 'home_county'],
            non_anonymize_fields: ['gender', 'available_ind', 'assign_student_role', 'allow_login', 'user_timezone'],
            required_fields: ['integration_id', 'family_name', 'given_name', 'email', 'user_id', 'available_ind'],
            optional_fields: ['middle_name', 'secondary_email', 'student_id', 'birth_dt', 'b_phone', 'm_phone', 'home_city', 'home_state', 'home_zip', 'home_county'],
            max_characters_fields: ['middle_name', 'home_city', 'home_state', 'home_county']
        },
        sections: {
            records: ['integration_id', 'course_section_name', 'course_section_id', 'term_id', 'course_integration_id', 'start_dt', 'end_dt', 'course_section_delivery', 'maximum_enrollment_count', 'credit_hours', 'registration_call_number']
        }
    }
}

let getDataRow = (inputFilePath) => {
    const records = [], headerData = [];
    return new Promise(function (resolve) {
        fileContent = fs.createReadStream(inputFilePath)
            .pipe(csv())
            .on('data', function (row) {
                records.push(row)
            })
            .on('headers', (headers) => {
                headerData.push(headers)
            })
            .on('end', function () {
                resolve({
                    header: headerData,
                    records: records
                });
            })
    });
}

let dateInaRange = (fromDate, toDate, dateToCheck, inputDate) => {
    return new Date(dateToCheck) >= new Date(fromDate) && new Date(dateToCheck) <= new Date(toDate) && new Date(dateToCheck) !== inputDate
}

let properDateFormat = (outputDate) => {
    let dateRegex = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
    return dateRegex.test(outputDate)
}


let dataInfo = async (inputFile, outputFile) => {
    return {
        inputData: await getDataRow(inputFile),
        outputData: await getDataRow(outputFile)
    }
}

let getAnonymizeDataWithIID = async (inputFile, outputFile) => {
    let userIntegrationData = [];
    let userData = await dataInfo(inputFile, outputFile);
    let duplicateCount = 0;
    for (let i = 0; i < userData.inputData.records.length; i++) {
        let outputData = {
            index: i + 1,
            original_integration_id: userData.inputData.records[i].integration_id
        }
        if (i > 0) {
            for (let j = 0; j < i; j++) {
                if (userData.inputData.records[i].integration_id === userData.inputData.records[j].integration_id) {
                    outputData.masked_integration_id = getAnonymizeInfo().users.integration_id + (j + 1)
                    duplicateCount += 1;
                    break;
                } else {
                    outputData.masked_integration_id = getAnonymizeInfo().users.integration_id + (i + 1 - parseInt(duplicateCount))
                }
            }
        } else {
            outputData.masked_integration_id = getAnonymizeInfo().users.integration_id + (i + 1)
        }
        userIntegrationData.push(outputData)
    }
    return {
        userData,
        userIntegrationData
    }
}

module.exports = {
    getAnonymizeInfo,
    getDataRow,
    dateInaRange,
    properDateFormat,
    dataInfo,
    getAnonymizeDataWithIID
}