'use client';

import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
// import { useEffect } from 'react';
// import i18n from "@/i18n/config"
import { useAuthStore } from '@/stores/useAuthStore';

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  // useEffect(() => {
  //   i18n.changeLanguage('fa');

  // }, [])
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
      router.push('/dashboard')
    } catch (err) {
      console.error('خطای ورود:', err);
    }
  };

  return (
    <Container maxWidth="xs" >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant="h5" align="center" color="black">
          {t("welcome")}
        </Typography>

        <TextField
          label={t("username")}
          variant="outlined"
          fullWidth
          {...register('username', { required: t('username_required') })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        <TextField
          label={t("password")}
          type="password"
          variant="outlined"
          fullWidth
          {...register('password', { required: t('password_required') })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button variant="contained" color="primary" type="submit">
          {t("login")}
        </Button>
      </Box>
    </Container>
  );
}
