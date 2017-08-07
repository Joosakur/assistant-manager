-- Table: public.employers
CREATE TABLE public.employers
(
  id uuid NOT NULL,
  birthday date NOT NULL,
  email character varying(64) COLLATE pg_catalog."default" NOT NULL,
  enabled boolean NOT NULL,
  first_name character varying(20) COLLATE pg_catalog."default" NOT NULL,
  last_name character varying(30) COLLATE pg_catalog."default" NOT NULL,
  password character varying(60) COLLATE pg_catalog."default" NOT NULL,
  CONSTRAINT employers_pkey PRIMARY KEY (id),
  CONSTRAINT employers_unique_email UNIQUE (email)
)
WITH (
OIDS = FALSE
)
TABLESPACE pg_default;



-- Table: public.assistants
CREATE TABLE public.assistants
(
  id uuid NOT NULL,
  active boolean NOT NULL,
  bg_color bytea NOT NULL,
  birthday date NOT NULL,
  email character varying(64) COLLATE pg_catalog."default",
  first_name character varying(20) COLLATE pg_catalog."default" NOT NULL,
  last_name character varying(30) COLLATE pg_catalog."default" NOT NULL,
  nick character varying(12) COLLATE pg_catalog."default",
  text_color bytea NOT NULL,
  employer_id uuid NOT NULL,
  CONSTRAINT assistants_pkey PRIMARY KEY (id),
  CONSTRAINT assistants_unique_employer_email UNIQUE (employer_id, email),
  CONSTRAINT assistants_fkey_employers FOREIGN KEY (employer_id)
  REFERENCES public.employers (id) MATCH SIMPLE
  ON UPDATE NO ACTION
  ON DELETE NO ACTION
)
WITH (
OIDS = FALSE
)
TABLESPACE pg_default;

-- Index: idx_assistant_2
CREATE INDEX idx_assistant_2
  ON public.assistants USING btree
  (employer_id)
TABLESPACE pg_default;




-- Table: public.work_shifts
CREATE TABLE public.work_shifts
(
  id uuid NOT NULL,
  ends timestamp without time zone NOT NULL,
  sick boolean NOT NULL,
  starts timestamp without time zone NOT NULL,
  assistant_id uuid,
  employer_id uuid,
  CONSTRAINT work_shifts_pkey PRIMARY KEY (id),
  CONSTRAINT work_shifts_fkey_assistants FOREIGN KEY (assistant_id)
  REFERENCES public.assistants (id) MATCH SIMPLE
  ON UPDATE NO ACTION
  ON DELETE NO ACTION,
  CONSTRAINT work_shifts_fkey_employers FOREIGN KEY (employer_id)
  REFERENCES public.employers (id) MATCH SIMPLE
  ON UPDATE NO ACTION
  ON DELETE NO ACTION
)
WITH (
OIDS = FALSE
)
TABLESPACE pg_default;

-- Index: idx_work_shift_2
CREATE INDEX idx_work_shift_2
  ON public.work_shifts USING btree
  (employer_id)
TABLESPACE pg_default;

-- Index: idx_work_shift_3
CREATE INDEX idx_work_shift_3
  ON public.work_shifts USING btree
  (employer_id, starts, ends)
TABLESPACE pg_default;

-- Index: idx_work_shift_4
CREATE INDEX idx_work_shift_4
  ON public.work_shifts USING btree
  (assistant_id)
TABLESPACE pg_default;

-- Index: idx_work_shift_5
CREATE INDEX idx_work_shift_5
  ON public.work_shifts USING btree
  (assistant_id, starts, ends)
TABLESPACE pg_default;



-- Table: public.verification_tokens
CREATE TABLE public.verification_tokens
(
  id uuid NOT NULL,
  expires timestamp without time zone,
  target character varying(16) COLLATE pg_catalog."default" NOT NULL,
  used boolean NOT NULL,
  employer_id uuid NOT NULL,
  CONSTRAINT verification_tokens_pkey PRIMARY KEY (id),
  CONSTRAINT verification_tokens_fkey_employers FOREIGN KEY (employer_id)
  REFERENCES public.employers (id) MATCH SIMPLE
  ON UPDATE NO ACTION
  ON DELETE NO ACTION
)
WITH (
OIDS = FALSE
)
TABLESPACE pg_default;

