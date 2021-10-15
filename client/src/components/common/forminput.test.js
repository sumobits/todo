const forminput = require("./forminput")
// @ponicode
describe("forminput.default", () => {
    test("0", () => {
        let callFunction = () => {
            forminput.default("George")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            forminput.default("Anas")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            forminput.default("Jean-Philippe")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            forminput.default("Michael")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            forminput.default("Edmond")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            forminput.default(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
