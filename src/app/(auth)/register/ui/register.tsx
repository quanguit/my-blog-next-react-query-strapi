'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Form, Input } from '@/components';
import { PasswordInput } from '@/components/password-input';
import { allRoutes } from '@/constants';
import { registerSchema, RegiterInputDTO } from '@/features';
import { useRegisterMutation } from '@/generated/graphql';
import { useAuth } from '@/hooks';

export const Register = () => {
  const { mutate } = useRegisterMutation();
  const router = useRouter();
  const { refetchUser } = useAuth();

  const methods = useForm<RegiterInputDTO>({
    resolver: yupResolver(registerSchema),
  });

  const { handleSubmit, watch } = methods;

  const [username, email, password] = watch(['username', 'email', 'password']);

  const onSubmit: SubmitHandler<RegiterInputDTO> = (input) => {
    mutate(
      { input },
      {
        onSuccess: () => {
          refetchUser();
          router.push(allRoutes['/'].toURL());
        },
      },
    );
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4" align="center" mb={1} fontWeight={600}>
        Join My Journey! Create Your Account
      </Typography>
      <Typography variant="body1" align="center" mb={3} fontWeight={500}>
        Sign up to follow my stories, receive updates, and be part of the
        conversation.
      </Typography>
      <Form
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={2}
        width={1}
      >
        <Input name="username" label="Username" />
        <Input name="email" label="Email" />
        <PasswordInput name="password" label="Password" />
        <Button variant="contained" type="submit">
          Register
        </Button>
        <Button href={allRoutes.login.toURL()} component={Link}>
          Login
        </Button>
        <Typography align="center">
          Please{' '}
          <Typography
            color="primary"
            component={Link}
            href={allRoutes['/'].toURL()}
            sx={{ textDecoration: 'underline' }}
          >
            click here
          </Typography>{' '}
          to use without register
        </Typography>
      </Form>
    </Container>
  );
};
