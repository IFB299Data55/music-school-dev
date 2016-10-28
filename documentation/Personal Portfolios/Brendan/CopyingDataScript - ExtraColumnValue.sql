ALTER TABLE music_school.instrument_types ALTER COLUMN lesson_fee DROP NOT NULL;

INSERT INTO music_school.instrument_types (id, name)
SELECT inst_type_id::integer, name FROM music_school_backup.instrument_types;

UPDATE music_school.instrument_types
SET lesson_fee = 30.00;

ALTER TABLE music_school.instrument_types ALTER COLUMN lesson_fee SET NOT NULL;