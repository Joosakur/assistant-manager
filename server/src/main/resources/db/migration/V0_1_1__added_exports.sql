-- Table: public.exports
CREATE TABLE public.exports
(
  id uuid NOT NULL,
  download_link character varying(768) COLLATE pg_catalog."default",
  error character varying(64) COLLATE pg_catalog."default",
  expires timestamp without time zone,
  from_date date NOT NULL,
  status character varying(12) COLLATE pg_catalog."default" NOT NULL,
  to_date date NOT NULL,
  assistant_id uuid NOT NULL,
  employer_id uuid NOT NULL,
  CONSTRAINT exports_pkey PRIMARY KEY (id),
  CONSTRAINT exports_fkey_assistants FOREIGN KEY (assistant_id)
  REFERENCES public.assistants (id) MATCH SIMPLE
  ON UPDATE NO ACTION
  ON DELETE NO ACTION,
  CONSTRAINT exports_fkey_employers FOREIGN KEY (employer_id)
  REFERENCES public.employers (id) MATCH SIMPLE
  ON UPDATE NO ACTION
  ON DELETE NO ACTION
)
WITH (
OIDS = FALSE
)
TABLESPACE pg_default;

-- Index: idx_exports_2
CREATE INDEX idx_exports_2
  ON public.exports USING btree
  (assistant_id)
TABLESPACE pg_default;