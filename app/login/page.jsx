'use client';

import api from '@/utils/axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await api.post('v3/users/authenticate', {
        username: data.username,
        password: data.password,
        domain: 'spa.radshid.com',
      });

      const token = res.data.token;
      login(token);
    } catch (err) {
      console.error('خطای ورود:', err);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant="h5" align="center" color="black">
          ورود به سیستم
        </Typography>

        <TextField
          label="نام کاربری"
          variant="outlined"
          fullWidth
          {...register('username', { required: 'نام کاربری الزامی است' })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        <TextField
          label="کلمه عبور"
          type="password"
          variant="outlined"
          fullWidth
          {...register('password', { required: 'کلمه عبور الزامی است' })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button variant="contained" color="primary" type="submit">
          ورود
        </Button>
      </Box>
    </Container>
  );
}
