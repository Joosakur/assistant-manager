ALTER TABLE public.employers
  ADD COLUMN city VARCHAR(36),
  ADD COLUMN heta_member BOOLEAN;

UPDATE public.employers
    SET city = 'Helsinki', heta_member = TRUE;

ALTER TABLE public.employers
  ALTER COLUMN city SET NOT NULL ,
  ALTER COLUMN heta_member SET NOT NULL;
