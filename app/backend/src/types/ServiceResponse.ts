export type ServiceResponseErrorType = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND';

export type ServiceResponseError<Type> = {
  status: ServiceResponseErrorType,
  data: Type,
};

export type ServiceResponseSuccess<Type> = {
  status: 'SUCCESS',
  data: Type,
};

export type ServiceResponse<Type> = ServiceResponseError<Type> | ServiceResponseSuccess<Type>;
