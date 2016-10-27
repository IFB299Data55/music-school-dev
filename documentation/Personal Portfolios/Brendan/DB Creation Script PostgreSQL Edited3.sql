-- -----------------------------------------------------
-- Schema music_school
-- -----------------------------------------------------
-- Database for Music School - ifb299

-- -----------------------------------------------------
-- Schema music_school
--
-- Database for Music School - ifb299
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS music_school;

-- -----------------------------------------------------
-- Table `music_school`.`passwords`
-- -----------------------------------------------------
DROP TABLE IF EXISTS music_school.passwords ;

CREATE SEQUENCE music_school.passwords_seq;

CREATE TABLE IF NOT EXISTS music_school.passwords (
  id INT NOT NULL DEFAULT NEXTVAL ('music_school.passwords_seq'),
  salt VARCHAR(120) NOT NULL,
  password VARCHAR(120) NOT NULL,
  PRIMARY KEY (id))
;


-- -----------------------------------------------------
-- Table `music_school`.`students`
-- -----------------------------------------------------
DROP TABLE IF EXISTS music_school.students ;

CREATE SEQUENCE music_school.students_seq;

CREATE TABLE IF NOT EXISTS music_school.students (
  id INT NOT NULL DEFAULT NEXTVAL ('music_school.students_seq'),
  first_name VARCHAR(45) NOT NULL,
  middle_name VARCHAR(45) NULL,
  last_name VARCHAR(45) NOT NULL,
  dob DATE NOT NULL,
  address VARCHAR(90) NOT NULL,
  phone_no VARCHAR(45) NOT NULL,
  email VARCHAR(90) NOT NULL,
  password_id INT NOT NULL,
  is_dormant BOOLEAN NOT NULL,
  date_registered DATE NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT students_email_uq UNIQUE (email),
  CONSTRAINT students_password_id_fk
    FOREIGN KEY (password_id)
    REFERENCES music_school.passwords (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `music_school`.`parents`
-- -----------------------------------------------------
DROP TABLE IF EXISTS music_school.parents ;

CREATE SEQUENCE music_school.parents_seq;

CREATE TABLE IF NOT EXISTS music_school.parents (
  id INT NOT NULL DEFAULT NEXTVAL ('music_school.parents_seq'),
  first_name VARCHAR(45) NOT NULL,
  middle_name VARCHAR(45) NULL,
  last_name VARCHAR(45) NOT NULL,
  dob DATE NOT NULL,
  address VARCHAR(90) NOT NULL,
  phone_no VARCHAR(45) NOT NULL,
  email VARCHAR(90) NOT NULL,
  password_id INT NOT NULL,
  is_dormant BOOLEAN NOT NULL,
  date_registered DATE NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT parents_email_uq UNIQUE (email),
  CONSTRAINT parents_password_id_fk
    FOREIGN KEY (password_id)
    REFERENCES music_school.passwords (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `music_school`.`parent_relationships`
-- -----------------------------------------------------
DROP TABLE IF EXISTS music_school.parent_relationships ;

CREATE TABLE IF NOT EXISTS music_school.parent_relationships (
  parent_id INT NOT NULL,
  student_id INT NOT NULL,
  relation_to_student VARCHAR(45) NOT NULL,
  PRIMARY KEY (parent_id, student_id),
  CONSTRAINT parentrel_parent_id_fk
    FOREIGN KEY (parent_id)
    REFERENCES music_school.parents (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT parentrel_student_id_fk
    FOREIGN KEY (student_id)
    REFERENCES music_school.students (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
;

CREATE INDEX parentrel_student_id_idx ON music_school.parent_relationships (student_id ASC);


-- -----------------------------------------------------
-- Table `music_school`.`teachers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS music_school.teachers ;

CREATE SEQUENCE music_school.teachers_seq;

CREATE TABLE IF NOT EXISTS music_school.teachers (
  id INT NOT NULL DEFAULT NEXTVAL ('music_school.teachers_seq'),
  first_name VARCHAR(45) NOT NULL,
  middle_name VARCHAR(45) NULL,
  last_name VARCHAR(45) NOT NULL,
  dob DATE NOT NULL,
  address VARCHAR(90) NOT NULL,
  phone_no VARCHAR(45) NOT NULL,
  email VARCHAR(90) NOT NULL,
  password_id INT NOT NULL,
  date_employed DATE NOT NULL,
  date_terminated DATE NULL,
  is_terminated BOOLEAN NOT NULL,
  staff_description VARCHAR(200) NULL,
  PRIMARY KEY (id),
  CONSTRAINT teachers_email_uq UNIQUE (email),
  CONSTRAINT teachers_password_id_fk
    FOREIGN KEY (password_id)
    REFERENCES music_school.passwords (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `music_school`.`managers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS music_school.managers ;

CREATE SEQUENCE music_school.managers_seq;

CREATE TABLE IF NOT EXISTS music_school.managers (
  id INT NOT NULL DEFAULT NEXTVAL ('music_school.managers_seq'),
  first_name VARCHAR(45) NOT NULL,
  middle_name VARCHAR(45) NULL,
  last_name VARCHAR(45) NOT NULL,
  dob DATE NOT NULL,
  address VARCHAR(90) NOT NULL,
  phone_no VARCHAR(45) NOT NULL,
  email VARCHAR(90) NOT NULL,
  date_employed DATE NOT NULL,
  password_id INT NOT NULL,
  date_terminated DATE NULL,
  is_terminated BOOLEAN NOT NULL,
  staff_description VARCHAR(200) NULL,
  PRIMARY KEY (id),
  CONSTRAINT mngr_email_uq UNIQUE (email),
  CONSTRAINT mngr_password_id_fk
    FOREIGN KEY (password_id)
    REFERENCES music_school.passwords (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

CREATE INDEX mngr_password_id_idx ON music_school.managers (password_id ASC);


-- -----------------------------------------------------
-- Table `music_school`.`instrument_types`
-- -----------------------------------------------------
DROP TABLE IF EXISTS music_school.instrument_types ;

CREATE SEQUENCE music_school.instrument_types_seq;

CREATE TABLE IF NOT EXISTS music_school.instrument_types (
  id INT NOT NULL DEFAULT NEXTVAL ('music_school.instrument_types_seq'),
  name VARCHAR(45) NOT NULL,
  lesson_fee DECIMAL(7,2) NOT NULL,
  PRIMARY KEY (id))
;


-- -----------------------------------------------------
-- Table `music_school`.`conditions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS music_school.conditions ;

CREATE SEQUENCE music_school.conditions_seq;

CREATE TABLE IF NOT EXISTS music_school.conditions (
  id INT NOT NULL DEFAULT NEXTVAL ('music_school.conditions_seq'),
  condition VARCHAR(150) NOT NULL,
  PRIMARY KEY (id))
;


-- -----------------------------------------------------
-- Table `music_school`.`instruments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS music_school.instruments ;

CREATE SEQUENCE music_school.instruments_seq;

CREATE TABLE IF NOT EXISTS music_school.instruments (
  id INT NOT NULL DEFAULT NEXTVAL ('music_school.instruments_seq'),
  inst_type_id INT NOT NULL,
  serial_no VARCHAR(45) NOT NULL,
  condition_id INT NOT NULL,
  purchase_date DATE NOT NULL,
  purchase_price DECIMAL(10,2) NOT NULL,
  model VARCHAR(150) NOT NULL,
  hire_fee DECIMAL(10,2) NOT NULL,
  inst_notes VARCHAR(150) NULL,
  is_sold_or_disposed BOOLEAN NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT inst_serial_no_uq UNIQUE (serial_no),
  CONSTRAINT inst_inst_type_id_fk
    FOREIGN KEY (inst_type_id)
    REFERENCES music_school.instrument_types (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT inst_conditions_id_fk
    FOREIGN KEY (condition_id)
    REFERENCES music_school.conditions (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

CREATE INDEX inst_inst_type_id_fk_idx ON music_school.instruments (inst_type_id ASC);
CREATE INDEX inst_conditions_id_fk_idx ON music_school.instruments (condition_id ASC);


-- -----------------------------------------------------
-- Table `music_school`.`student_experience`
-- -----------------------------------------------------
DROP TABLE IF EXISTS music_school.student_experience ;

CREATE TABLE IF NOT EXISTS music_school.student_experience (
  student_id INT NOT NULL,
  inst_type_id INT NOT NULL,
  grade INT NOT NULL,
  PRIMARY KEY (student_id, inst_type_id),
  CONSTRAINT studentexp_student_id_fk
    FOREIGN KEY (student_id)
    REFERENCES music_school.students (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT studentexp_inst_type_id_fk
    FOREIGN KEY (inst_type_id)
    REFERENCES music_school.instrument_types (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

CREATE INDEX studentexp_inst_type_id_idx ON music_school.student_experience (inst_type_id ASC);


-- -----------------------------------------------------
-- Table `music_school`.`teacher_experience`
-- -----------------------------------------------------
DROP TABLE IF EXISTS music_school.teacher_experience ;

CREATE TABLE IF NOT EXISTS music_school.teacher_experience (
  teacher_id INT NOT NULL,
  inst_type_id INT NOT NULL,
  grade INT NOT NULL,
  exp_description VARCHAR(200) NULL,
  PRIMARY KEY (teacher_id, inst_type_id),
  CONSTRAINT teachexp_teacher_id_fk
    FOREIGN KEY (teacher_id)
    REFERENCES music_school.teachers (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT teachexp_inst_type_id_fk
    FOREIGN KEY (inst_type_id)
    REFERENCES music_school.instrument_types (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

CREATE INDEX tchexp_inst_type_id_idx ON music_school.teacher_experience (inst_type_id ASC);


-- -----------------------------------------------------
-- Table `music_school`.`rooms`
-- -----------------------------------------------------
DROP TABLE IF EXISTS music_school.rooms ;

CREATE TABLE IF NOT EXISTS music_school.rooms (
  room_no INT NOT NULL,
  name VARCHAR(90) NOT NULL,
  is_available BOOLEAN NOT NULL,
  PRIMARY KEY (room_no))
;



-- -----------------------------------------------------
-- Table `music_school`.`request_status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS music_school.request_status ;

CREATE SEQUENCE music_school.request_status_seq;

CREATE TABLE IF NOT EXISTS music_school.request_status (
  id INT NOT NULL DEFAULT NEXTVAL ('music_school.request_status_seq'),
  status VARCHAR(90) NOT NULL,
  PRIMARY KEY (id))
;



-- -----------------------------------------------------
-- Table `music_school`.`instrument_hire`
-- -----------------------------------------------------
DROP TABLE IF EXISTS music_school.instrument_hire ;

CREATE SEQUENCE music_school.instrument_hire_seq;

CREATE TABLE IF NOT EXISTS music_school.instrument_hire (
  id INT NOT NULL DEFAULT NEXTVAL ('music_school.instrument_hire_seq'),
  instrument_id INT NOT NULL,
  student_id INT NOT NULL,
  request_date DATE NOT NULL,
  hire_status_id INT NOT NULL,
  hire_date DATE NULL,
  due_date DATE NULL,
  return_date DATE NULL,
  is_returned BOOLEAN NULL,
  PRIMARY KEY (id),
  CONSTRAINT insthire_instrument_id_fk
    FOREIGN KEY (instrument_id)
    REFERENCES music_school.instruments (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT insthire_student_id_fk
    FOREIGN KEY (student_id)
    REFERENCES music_school.students (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT insthire_hirestatus_id_fk
    FOREIGN KEY (hire_status_id)
    REFERENCES music_school.request_status (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

CREATE INDEX insthire_instrument_id_idx ON music_school.instrument_hire (instrument_id ASC);
CREATE INDEX insthire_student_id_idx ON music_school.instrument_hire (student_id ASC);
CREATE INDEX insthire_hirestatus_id_idx ON music_school.instrument_hire (hire_status_id ASC);


-- -----------------------------------------------------
-- Table `music_school`.`lessons`
-- -----------------------------------------------------
DROP TABLE IF EXISTS music_school.lessons ;

CREATE SEQUENCE music_school.lessons_seq;

CREATE TABLE IF NOT EXISTS music_school.lessons (
  id INT NOT NULL DEFAULT NEXTVAL ('music_school.lessons_seq'),
  student_id INT NOT NULL,
  inst_type_id INT NOT NULL,
  teacher_id INT NULL,
  room_no INT NULL,
  lesson_start_time TIME(0) NOT NULL,
  lesson_end_time TIME(0) NOT NULL,
  lesson_day VARCHAR(45) NOT NULL,
  lesson_year INT NOT NULL,
  lesson_term INT NOT NULL,
  lesson_fee DECIMAL(10,2) NOT NULL,
  request_date DATE NOT NULL,
  accept_date DATE NULL,
  request_status_id INT NOT NULL,
  lesson_notes VARCHAR(150) NULL,
  PRIMARY KEY (id),
  CONSTRAINT lessons_inst_type_id_fk
    FOREIGN KEY (inst_type_id)
    REFERENCES music_school.instrument_types (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT lessons_teacher_id_fk
    FOREIGN KEY (teacher_id)
    REFERENCES music_school.teachers (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT lessons_student_id_fk
    FOREIGN KEY (student_id)
    REFERENCES music_school.students (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT lessons_room_no_fk
    FOREIGN KEY (room_no)
    REFERENCES music_school.rooms (room_no)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT lessons_reqstatus_fk
    FOREIGN KEY (request_status_id)
    REFERENCES music_school.request_status (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

CREATE INDEX lessons_teacher_id_idx ON music_school.lessons (teacher_id ASC);
CREATE INDEX lessons_student_id_idx ON music_school.lessons (student_id ASC);
CREATE INDEX lessons_room_no_idx ON music_school.lessons (room_no ASC);
CREATE INDEX lessons_inst_type_id_idx ON music_school.lessons (inst_type_id ASC);
CREATE INDEX lessons_reqstatus_id_idx ON music_school.lessons (request_status_id ASC);



-- -----------------------------------------------------
-- Table `music_school`.`lesson_rejections`
-- -----------------------------------------------------
DROP TABLE IF EXISTS music_school.lesson_rejections ;

CREATE TABLE IF NOT EXISTS music_school.lesson_rejections (
  lesson_id INT NOT NULL,
  teacher_id INT NOT NULL,
  PRIMARY KEY (lesson_id, teacher_id),
  CONSTRAINT lessreject_lesson_id_fk
    FOREIGN KEY (lesson_id)
    REFERENCES music_school.lessons (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT lessreject_teacher_id_fk
    FOREIGN KEY (teacher_id)
    REFERENCES music_school.teachers (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `music_school`.`teacher_change_requests`
-- -----------------------------------------------------
DROP TABLE IF EXISTS music_school.teacher_change_requests ;

CREATE SEQUENCE music_school.teacher_change_requests_seq;

CREATE TABLE IF NOT EXISTS music_school.teacher_change_requests (
  id INT NOT NULL DEFAULT NEXTVAL ('music_school.teacher_change_requests_seq'),
  student_id INT NOT NULL,
  teacher_id INT NOT NULL,
  lesson_id INT NOT NULL,
  request_date DATE NOT NULL,
  request_status_id INT NOT NULL,
  approved_date DATE NULL,
  approvedbymanager_id INT NULL,
  request_notes VARCHAR(120) NULL,
  PRIMARY KEY (id),
  CONSTRAINT teach_chreq_student_id_fk
    FOREIGN KEY (student_id)
    REFERENCES music_school.students (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT teach_chreq_teacher_id_fk
    FOREIGN KEY (teacher_id)
    REFERENCES music_school.teachers (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT teach_chreq_lesson_id_fk
    FOREIGN KEY (lesson_id)
    REFERENCES music_school.lessons (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT teach_chreq_appbymngrid_fk
    FOREIGN KEY (approvedbymanager_id)
    REFERENCES music_school.managers (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT teach_chreq_reqstatusid_fk
    FOREIGN KEY (request_status_id)
    REFERENCES music_school.request_status (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

CREATE INDEX tchreq_student_id_idx ON music_school.teacher_change_requests (student_id ASC);
CREATE INDEX tchreq_teacher_id_idx ON music_school.teacher_change_requests (teacher_id ASC);
CREATE INDEX tchreq_lesson_id_idx ON music_school.teacher_change_requests (lesson_id ASC);
CREATE INDEX tchreq_appbymngrid_idx ON music_school.teacher_change_requests (approvedbymanager_id ASC);
CREATE INDEX tchreq_reqstatusid_idx ON music_school.teacher_change_requests (request_status_id ASC);


-- -----------------------------------------------------
-- Table `music_school`.`student_availability`
-- -----------------------------------------------------
DROP TABLE IF EXISTS music_school.student_availability ;

CREATE TABLE IF NOT EXISTS music_school.student_availability (
  student_id INT NOT NULL,
  day VARCHAR(45) NOT NULL,
  start_time TIME(0) NOT NULL,
  end_time TIME(0) NOT NULL,
  PRIMARY KEY (student_id, day, start_time, end_time),
  CONSTRAINT stud_avail_student_id_fk
    FOREIGN KEY (student_id)
    REFERENCES music_school.students (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `music_school`.`teacher_availability`
-- -----------------------------------------------------
DROP TABLE IF EXISTS music_school.teacher_availability ;

CREATE TABLE IF NOT EXISTS music_school.teacher_availability (
  teacher_id INT NOT NULL,
  day VARCHAR(45) NOT NULL,
  start_time TIME(0) NOT NULL,
  end_time TIME(0) NOT NULL,
  PRIMARY KEY (teacher_id, day, start_time, end_time),
  CONSTRAINT teach_avail_teacher_id_fk
    FOREIGN KEY (teacher_id)
    REFERENCES music_school.teachers (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `music_school`.`employment_types`
-- -----------------------------------------------------
DROP TABLE IF EXISTS music_school.employment_types ;

CREATE SEQUENCE music_school.employment_types_seq;

CREATE TABLE IF NOT EXISTS music_school.employment_types (
  id INT NOT NULL DEFAULT NEXTVAL ('music_school.employment_types_seq'),
  employment_type VARCHAR(45) NOT NULL,
  PRIMARY KEY (id))
;


-- -----------------------------------------------------
-- Table `music_school`.`teacher_contracts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS music_school.teacher_contracts ;

CREATE SEQUENCE music_school.teacher_contracts_seq;

CREATE TABLE IF NOT EXISTS music_school.teacher_contracts (
  id INT NOT NULL DEFAULT NEXTVAL ('music_school.teacher_contracts_seq'),
  teacher_id INT NOT NULL,
  employment_type_id INT NOT NULL,
  salary DECIMAL(10,2) NULL,
  pay_rate DECIMAL(10,2) NULL,
  weekly_hours INT NOT NULL,
  contract_notes VARCHAR(200) NULL,
  PRIMARY KEY (id),
  CONSTRAINT check_tchr_salary_or_rate CHECK (
    (salary IS NOT NULL AND pay_rate IS NULL)
    OR (salary IS NULL AND pay_rate IS NOT NULL)), 
  CONSTRAINT teachcont_teacher_id_fk
    FOREIGN KEY (teacher_id)
    REFERENCES music_school.teachers (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT teach_cont_emptype_id_fk
    FOREIGN KEY (employment_type_id)
    REFERENCES music_school.employment_types (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

CREATE INDEX tchcont_teacher_id_idx ON music_school.teacher_contracts (teacher_id ASC);
CREATE INDEX tchcont_emptype_id_idx ON music_school.teacher_contracts (employment_type_id ASC);


-- -----------------------------------------------------
-- Table `music_school`.`manager_contracts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS music_school.manager_contracts ;

CREATE SEQUENCE music_school.manager_contracts_seq;

CREATE TABLE IF NOT EXISTS music_school.manager_contracts (
  id INT NOT NULL DEFAULT NEXTVAL ('music_school.manager_contracts_seq'),
  manager_id INT NOT NULL,
  employment_type_id INT NOT NULL,
  salary DECIMAL(10,2) NULL,
  pay_rate DECIMAL(10,2) NULL,
  weekly_hours INT NOT NULL,
  contract_notes VARCHAR(200) NULL,
  PRIMARY KEY (id),
  CONSTRAINT check_mngr_salary_or_rate CHECK (
    (salary IS NOT NULL AND pay_rate IS NULL)
    OR (salary IS NULL AND pay_rate IS NOT NULL)),
  CONSTRAINT mngrcont_manager_id_fk
    FOREIGN KEY (manager_id)
    REFERENCES music_school.managers (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT mngr_cont_emptype_id_fk
    FOREIGN KEY (employment_type_id)
    REFERENCES music_school.employment_types (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table `music_school`.`teacher_applicants`
-- -----------------------------------------------------
DROP TABLE IF EXISTS music_school.teacher_applicants ;

CREATE SEQUENCE music_school.teacher_applicants_seq;

CREATE TABLE IF NOT EXISTS music_school.teacher_applicants (
  id INT NOT NULL DEFAULT NEXTVAL ('music_school.teacher_applicants_seq'),
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  phone_no VARCHAR(45) NOT NULL,
  email VARCHAR(90) NOT NULL,
  resume_link VARCHAR(90) NOT NULL,
  date_applied DATE NOT NULL,
  status_id INT NOT NULL,
  is_shortlisted BOOLEAN NOT NULL,
  is_approved BOOLEAN NOT NULL,
  approved_date DATE NULL,
  approvedbymanager_id INT NULL,
  PRIMARY KEY (id),
  CONSTRAINT teachapp_email_uq UNIQUE (email),
  CONSTRAINT teachapp_status_id_fk
    FOREIGN KEY (status_id)
    REFERENCES music_school.request_status (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT teachapp_appbymngrid_fk
    FOREIGN KEY (approvedbymanager_id)
    REFERENCES music_school.managers (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

CREATE INDEX tchapp_appbymngrid_idx ON music_school.teacher_applicants (approvedbymanager_id ASC);