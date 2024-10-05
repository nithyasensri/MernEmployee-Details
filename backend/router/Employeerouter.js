
const express = require('express')

const { createEmployee, getEmployee,
    getSingleEmployee, deleteEmployee, updateEmployee } = require('../controllers/employeecontrollers')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// router.use(requireAuth)

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
        // cb(null, Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({ storage: storage })



router.post('/', upload.single('file'), createEmployee)

router.get('/', getEmployee)

// router.get('/:id', getSingleEmployee)

router.delete('/:id', deleteEmployee)

router.patch('/:id',upload.single('file'), updateEmployee)



module.exports = router