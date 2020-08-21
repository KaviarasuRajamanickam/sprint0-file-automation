const fileValidator = require("../../controllers/file-validation");

describe('To assert the datas present in the users file', () => {

    beforeAll(async () => {
        userInfo = await fileValidator.getAnonymizeDataWithIID('testData/users-input-file.csv', 'testData/users-output-file.csv');
    });

    it('Verify whether the integration_id is displayed in sequential order for all the rows in the output file', () => {
        userInfo.userData.outputData.records.map(function(current_record, index) {
            expect(current_record.integration_id).toBe(userInfo.userIntegrationData[index].masked_integration_id);
        })
    })

    it('Verify whether the family_name is displayed with "lname_1234" for all the rows.', () => {
        userInfo.userData.outputData.records.map(function(current_record) {
            current_record.family_name === '' ? expect(current_record.family_name).toBe('') : expect(current_record.family_name).toBe(fileValidator.getAnonymizeInfo().users.family_name);
        })
    })    

    it('Verify whether the middle_name is displayed with "mname_1234" for all the rows.', () => {
        userInfo.userData.outputData.records.map(function(current_record) {
            current_record.middle_name === '' ? expect(current_record.middle_name).toBe('') : expect(current_record.middle_name).toBe(fileValidator.getAnonymizeInfo().users.middle_name);
        })
    })

    it('Verify whether the given_name is displayed with "fname_1234" for all the rows.', () => {
        userInfo.userData.outputData.records.map(function(current_record) {
            current_record.given_name === '' ? expect(current_record.given_name).toBe('') : expect(current_record.given_name).toBe(fileValidator.getAnonymizeInfo().users.given_name);
        })
    })

    it('Verify whether the email is displayed with "success@simulator.amazonses.com" for all the rows.', () => {
        userInfo.userData.outputData.records.map(function(current_record) {
            current_record.email === '' ? expect(current_record.email).toBe('') : expect(current_record.email).toBe(fileValidator.getAnonymizeInfo().users.email);
        })
    })

    it('Verify whether the secondary_email is displayed with "success@simulator.amazonses.com" for all the rows.', () => {
        userInfo.userData.outputData.records.map(function(current_record) {
            current_record.secondary_email === '' ? expect(current_record.secondary_email).toBe('') : expect(current_record.secondary_email).toBe(fileValidator.getAnonymizeInfo().users.secondary_email);
        })
    })

    it('Verify whether the student_id is displayed with "sid_1234" for all the rows.', () => {
        userInfo.userData.outputData.records.map(function(current_record) {
            current_record.student_id === '' ? expect(current_record.student_id).toBe('') : expect(current_record.student_id).toBe(fileValidator.getAnonymizeInfo().users.student_id);
        })
    })

    it('Verify whether the user_id is displayed with "u_1234" for all the rows.', () => {
        userInfo.userData.outputData.records.map(function(current_record) {
            current_record.user_id === '' ? expect(current_record.user_id).toBe('') : expect(current_record.user_id).toBe(fileValidator.getAnonymizeInfo().users.user_id);
        })
    })

    it('Verify whether the birth_dt value is populated based on the random date range', () => {
        let birth_dt_status = false;
        const minDate = fileValidator.getAnonymizeInfo().users.birth_dt.min_date,
            maxDate = fileValidator.getAnonymizeInfo().users.birth_dt.max_date;
        userInfo.userData.outputData.records.map(function(current_record, index) {
            try {
                current_record.birth_dt === '' ? expect(current_record.birth_dt).toBe('') : expect(fileValidator.dateInaRange(minDate, maxDate, current_record.birth_dt, userInfo.userData.inputData.records[index].birth_dt)).toBeTruthy();
            } catch (err) {
                birth_dt_status = true;
                console.error(current_record.birth_dt, ' birth date is not in the available range for the integration ID - ', current_record.integration_id)
            }
        })
        if (birth_dt_status) {
            expect(birth_dt_status).not.toBe(true);
        }
    })

    it('Verify whether the birth_dt value is displayed in the format yyyy-mm-dd', () => {
        let birth_dt_status = false;
        userInfo.userData.outputData.records.map(function(current_record) {
            try {
                current_record.birth_dt === '' ? expect(current_record.birth_dt).toBe('') : expect(fileValidator.properDateFormat(current_record.birth_dt)).toBeTruthy();
            } catch (err) {
                birth_dt_status = true;
                console.error(current_record.birth_dt, ' birth date value is not displayed in the format yyyy-mm-dd for the integration ID - ', current_record.integration_id)
            }
        })
        if (birth_dt_status) {
            expect(birth_dt_status).not.toBe(true);
        }
    })

    it('Verify whether the b_phone is displayed with "+17031234321" for all the rows.', () => {
        userInfo.userData.outputData.records.map(function(current_record) {
            current_record.b_phone === '' ? expect(current_record.b_phone).toBe('') : expect(current_record.b_phone).toBe(fileValidator.getAnonymizeInfo().users.b_phone);
        })
    })

    it('Verify whether the m_phone is displayed with "+17031234321" for all the rows that are pertained to "Students".', () => {
        userInfo.userData.outputData.records.map(function(current_record) {
            current_record.m_phone === '' ? expect(current_record.m_phone).toBe('') : expect(current_record.m_phone).toBe(fileValidator.getAnonymizeInfo().users.m_phone);
        })
    })

    it('Verify whether the gender,available_ind,assign_student_role,allow_login, and user_timezone column values are being correctly shown as per input User.txt file without anonymization', () => {
        const dataFeilds = fileValidator.getAnonymizeInfo().users.non_anonymize_fields;
        userInfo.userData.outputData.records.map(function(current_record, index) {
            dataFeilds.map(function(current_field) {
                current_record[current_field] === '' ? expect(current_record[current_field]).toBe('') : expect(current_record[current_field]).toBe(userInfo.userData.inputData.records[index][current_field]);
            })
        })
    })

    it('Verify whether the home_city is displayed with "home_city_1234" for all the rows.', () => {
        userInfo.userData.outputData.records.map(function(current_record) {
            current_record.home_city === '' ? expect(current_record.home_city).toBe('') : expect(current_record.home_city).toBe(fileValidator.getAnonymizeInfo().users.home_city);
        })
    })

    it('Verify whether the home_state is displayed with "home_state_1234" for all the rows.', () => {
        userInfo.userData.outputData.records.map(function(current_record) {
            current_record.home_state === '' ? expect(current_record.home_state).toBe('') : expect(current_record.home_state).toBe(fileValidator.getAnonymizeInfo().users.home_state);
        })
    })

    it('Verify whether the home_zip is displayed with "home_zip_1234" for all the rows.', () => {
        userInfo.userData.outputData.records.map(function(current_record) {
            current_record.home_zip === '' ? expect(current_record.home_zip).toBe('') : expect(current_record.home_zip).toBe(fileValidator.getAnonymizeInfo().users.home_zip);
        })
    })

    it('Verify whether the home_county is displayed with "home_county_1234" for all the rows.', () => {
        userInfo.userData.outputData.records.map(function(current_record) {
            current_record.home_county === '' ? expect(current_record.home_county).toBe('') : expect(current_record.home_county).toBe(fileValidator.getAnonymizeInfo().users.home_county);
        })
    })

    it('Verify whether the max character value is correctly shown when the columns middle_name, home_city, home_state, and home_county are entered with max characters', () => {
        const dataFeilds = fileValidator.getAnonymizeInfo().users.max_characters_fields;
        userInfo.userData.outputData.records.map(function(current_record, index) {
            dataFeilds.map(function(current_field) {
                current_record[current_field] === '' ? expect(current_record[current_field]).toBe('') : expect(current_record[current_field]).toBe(fileValidator.getAnonymizeInfo().users[current_field]);
            })
        })
    })

    it('Verify whether the actual records from input file are correctly spooled in the output File', () => {
        const dataFeilds = fileValidator.getAnonymizeInfo().users.anonymize_fields;
        expect(userInfo.userData.outputData.header[0]).toEqual(userInfo.userData.inputData.header[0]);
        userInfo.userData.outputData.records.map(function(current_record, index) {
            dataFeilds.map(function(current_field) {
                current_record[current_field] === '' ?
                expect(current_record[current_field]).toBe('') :
                current_field === 'integration_id' ?
                expect(current_record.integration_id).toBe(userInfo.userIntegrationData[index].masked_integration_id) :
                current_field === 'birth_dt' ?
                expect(fileValidator.dateInaRange(fileValidator.getAnonymizeInfo().users[current_field].min_date, fileValidator.getAnonymizeInfo().users[current_field].max_date, current_record[current_field], userInfo.userData.inputData.records[index][current_field])).toBeTruthy() :
                expect(current_record[current_field]).toBe(fileValidator.getAnonymizeInfo().users[current_field]);
            })
        })
    })


})