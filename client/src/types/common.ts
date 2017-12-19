import { ChangeEvent, FormEvent } from 'react';
import { ChangeEvent as AutosuggestChangeEvent } from 'react-autosuggest';

export type AutosuggestChangeEventHandler = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | FormEvent<HTMLInputElement>,
  selectEvent?: AutosuggestChangeEvent,
  field?: string,
) => void;
